#!/usr/bin/env node
/*
  render-create-service.js

  Purpose: prepare and optionally create a Render web service pointing at a GitHub repo.

  Usage (dry-run, prints payload and curl command):
    node scripts/render-create-service.js ./scripts/render.service.create.json

  To actually create the service (requires RENDER_API_KEY):
    RENDER_API_KEY=your_api_key node scripts/render-create-service.js ./scripts/render.service.create.json --create

  Notes:
  - This script performs a dry-run by default (prints payload and suggested curl command).
  - Creating a service via API requires permission; Render account must have GitHub connected.
  - The script is conservative and logs the API response when creating a service.
  - Do NOT store secrets in the example file. Use the `env` object in the JSON for non-sensitive default keys, and set sensitive values in Render dashboard or via the env-setting script.
*/

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_BASE = 'https://api.render.com/v1';

async function main() {
  const fileArg = process.argv[2] || path.join(__dirname, 'render.service.create.json');
  const doCreate = process.argv.includes('--create');

  if (!fs.existsSync(fileArg)) {
    console.error('Service JSON not found:', fileArg);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(fileArg, 'utf8'));

  // Basic validation
  if (!payload.name || !payload.repo || !payload.repo.name) {
    console.error('Missing required fields in service JSON. Need `name` and `repo.name` (owner/repo).');
    process.exit(1);
  }

  // Build API payload following Render patterns
  const apiPayload = {
    name: payload.name,
    serviceDetails: {
      // Deprecated in some docs; we include repo settings under 'repo' below
    },
    repo: {
      name: payload.repo.name, // owner/repo
      type: payload.repo.type || 'github',
      branch: payload.repo.branch || 'main',
      rootDir: payload.rootDir || payload.root || '',
    },
    env: payload.env || {},
    plan: payload.plan || 'free',
    buildCommand: payload.buildCommand || null,
    startCommand: payload.startCommand || null,
    autoDeploy: payload.autoDeploy !== false,
  };

  console.log('Prepared Render service payload (abbreviated):');
  const preview = Object.assign({}, apiPayload, { env: '<vars hidden>' });
  console.log(JSON.stringify(preview, null, 2));

  // Print suggested curl command for user to run (if they prefer)
  console.log('\nSuggested curl command (replace <RENDER_API_KEY>):');
  console.log(`curl -X POST ${API_BASE}/services -H "Authorization: Bearer <RENDER_API_KEY>" -H "Content-Type: application/json" -d '${JSON.stringify(apiPayload)}'`);

  if (!doCreate) {
    console.log('\nDry-run complete. To actually create the service, re-run with --create and set RENDER_API_KEY.');
    process.exit(0);
  }

  const apiKey = process.env.RENDER_API_KEY;
  if (!apiKey) {
    console.error('RENDER_API_KEY is required to create a service. Set it as an environment variable and re-run.');
    process.exit(2);
  }

  const client = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
  });

  try {
    console.log('\nCreating service on Render...');
    const resp = await client.post('/services', apiPayload);
    console.log('Render response status:', resp.status);
    console.log('Service created:');
    console.log(JSON.stringify(resp.data, null, 2));
    console.log('\nService creation initiated. Note: Render may require GitHub access approval and additional steps in the UI to connect the repo.');
  } catch (err) {
    if (err.response) {
      console.error('Render API error:', err.response.status, err.response.data);
    } else {
      console.error('Error creating service:', err.message || err);
    }
    process.exit(3);
  }
}

main().catch(err => {
  console.error('Unexpected error:', err && err.message ? err.message : err);
  process.exit(10);
});
