import React, { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('azams_theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('azams_theme', isDark ? 'dark' : 'light');
    document.body.style.backgroundColor = isDark ? '#0f0f0e' : '#F7F4EF';
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      bg: isDark ? '#0f0f0e' : '#F7F4EF',
      bgCard: isDark ? '#1A1A18' : '#ffffff',
      bgMuted: isDark ? '#242422' : '#F0EDE6',
      ink: isDark ? '#F7F4EF' : '#1A1A18',
      muted: isDark ? 'rgba(255,255,255,0.4)' : '#8C8478',
      border: isDark ? 'rgba(255,255,255,0.08)' : '#E2DDD5',
      gold: '#C9A96E',
      navBg: isDark ? '#0f0f0e' : '#F7F4EF',
      navBorder: isDark ? 'rgba(255,255,255,0.06)' : '#E2DDD5',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);