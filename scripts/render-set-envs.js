#!/usr/bin/env node
/*
  render-set-envs.js
  Usage:
    RENDER_API_KEY=your_render_api_key node scripts/render-set-envs.js ./scripts/render.env.json

  This script finds a Render service by name and sets environment variables on it.
  It does NOT create services. Create the "swiftycart-backend" service in Render first (or change the service name below).
*/

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_BASE = 'https://api.render.com/v1';
const SERVICE_NAME = process.env.RENDER_SERVICE_NAME || 'swiftycart-backend';

async function main() {
  const apiKey = process.env.RENDER_API_KEY;
  if (!apiKey) {
    console.error('Error: set RENDER_API_KEY env var before running this script.');
    process.exit(1);
  }

  const fileArg = process.argv[2] || path.join(__dirname, 'render.env.json');
  if (!fs.existsSync(fileArg)) {
    console.error('Env file not found:', fileArg);
    process.exit(1);
  }

  const envData = JSON.parse(fs.readFileSync(fileArg, 'utf8'));

  const client = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    timeout: 20000,
  });

  console.log('Looking up Render services...');
  const svcList = (await client.get('/services')).data;
  const svc = svcList.find(s => s.name === SERVICE_NAME);
  if (!svc) {
    console.error(`Service named "${SERVICE_NAME}" not found in your Render account.`);
    console.error('Create the service in Render (use render.yaml or the UI), then re-run this script.');
    process.exit(2);
  }

  const serviceId = svc.id;
  console.log(`Found service: ${svc.name} (id=${serviceId})`);

  // Convert envData to array of { key, value, scope }
  const entries = Object.keys(envData).map(k => ({ key: k, value: String(envData[k]), scope: 'env' }));

  // Create or update env vars one by one (Render supports creating env vars via POST)
  for (const e of entries) {
    try {
      // Try to update existing variable first (PUT)
      // Render API doesn't have a simple upsert endpoint in v1; we'll attempt POST and ignore failures
      console.log(`Setting ${e.key}...`);
      await client.post(`/services/${serviceId}/env-vars`, { key: e.key, value: e.value, scope: e.scope });
      console.log(`  -> created ${e.key}`);
    } catch (err) {
      // Try to find existing var and update via PATCH
      try {
        const vars = (await client.get(`/services/${serviceId}/env-vars`)).data;
        const existing = vars.find(v => v.key === e.key);
        if (existing) {
          await client.patch(`/services/${serviceId}/env-vars/${existing.id}`, { value: e.value, scope: e.scope });
          console.log(`  -> updated ${e.key}`);
        } else {
          console.error(`  -> failed to create ${e.key}:`, err.message || err.toString());
        }
      } catch (err2) {
        console.error(`  -> error handling ${e.key}:`, err2.message || err2.toString());
      }
    }
  }

  console.log('All done. Restart the service from the Render dashboard to apply changes if needed.');
}

main().catch(err => {
  console.error('Unexpected error:', err && err.message ? err.message : err);
  process.exit(10);
});
