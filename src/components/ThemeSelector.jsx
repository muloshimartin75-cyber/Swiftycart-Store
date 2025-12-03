import React from 'react';
import { useTheme } from "../context/ThemeContext";

function ThemeSelector() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="theme-selector">
      <div className="theme-dropdown">
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)}
          className="theme-select"
        >
          {themes.map((themeName) => (
            <option key={themeName} value={themeName}>
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ThemeSelector;