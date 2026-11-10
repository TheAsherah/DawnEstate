"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const SUPPORTED_LANGUAGES = ['en', 'fr', 'ar'];

const isLanguage = (value) =>
  value !== null && SUPPORTED_LANGUAGES.includes(value);

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  // 1. Zdna check dyal typeof window !== 'undefined'
  const [language, setLanguageState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('dawn-estate-language');
      return isLanguage(saved) ? saved : 'en';
    }
    return 'en'; // Default f server
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  // 2. useEffect aslan kaykhdm gha f client, walakin zedna window check l-i7tiyat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('dawn-estate-language', language);
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
    }
  }, [language, dir]);

  const setLanguage = (lang) => {
    if (isLanguage(lang)) {
      setLanguageState(lang);
    }
  };

  const t = (key) => {
    const activeTranslations = translations[language] ?? translations.en;
    return activeTranslations[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}