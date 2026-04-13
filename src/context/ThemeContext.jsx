import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_VERSION = '10.9.7';
const BASE_URL = `https://cdn.jsdelivr.net/npm/primereact@${THEME_VERSION}/resources/themes`;

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isSticky, setIsSticky] = useState(() => {
    const saved = localStorage.getItem('header-sticky');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    const html = document.documentElement;
    const themeLink = document.getElementById('theme-link');
    
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (themeLink) {
        themeLink.href = `${BASE_URL}/lara-dark-blue/theme.css`;
      }
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (themeLink) {
        themeLink.href = `${BASE_URL}/lara-light-blue/theme.css`;
      }
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('header-sticky', isSticky);
  }, [isSticky]);

  const toggleTheme = () => setIsDark(prev => !prev);
  const toggleSticky = () => setIsSticky(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, isSticky, toggleSticky }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
