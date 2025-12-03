import React, { createContext, useState, useContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default");
  const [darkMode, setDarkMode] = useState(false);

  const themes = {
    default: {
      primary: "#3498db",
      secondary: "#2c3e50",
      accent: "#27ae60",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    ocean: {
      primary: "#1abc9c",
      secondary: "#16a085",
      accent: "#e74c3c",
      background: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"
    },
    sunset: {
      primary: "#e17055",
      secondary: "#d63031",
      accent: "#fdcb6e",
      background: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)"
    },
    forest: {
      primary: "#00b894",
      secondary: "#00a085",
      accent: "#fdcb6e",
      background: "linear-gradient(135deg, #00b894 0%, #0984e3 100%)"
    },
    purple: {
      primary: "#a29bfe",
      secondary: "#6c5ce7",
      accent: "#fd79a8",
      background: "linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)"
    },
    fire: {
      primary: "#e74c3c",
      secondary: "#c0392b",
      accent: "#f39c12",
      background: "linear-gradient(135deg, #e74c3c 0%, #f39c12 100%)"
    }
  };

  const currentTheme = themes[theme];

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    document.body.style.background = currentTheme.background;
  }, [darkMode, currentTheme]);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      darkMode, 
      setDarkMode, 
      currentTheme,
      themes: Object.keys(themes) 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};