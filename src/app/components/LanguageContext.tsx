"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "hi";

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  showLanguagePopup: boolean;
  chooseLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "kag-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  // Only decides whether to show the popup — does NOT write anything to
  // storage itself. A first-time visitor has no stored key at all, so we
  // must read-without-writing here; writing a default on mount would make
  // "never chosen" indistinguishable from "explicitly chose English" on
  // the next visit, which is exactly the bug this avoids.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "en") {
      setLanguageState(stored);
    } else {
      setShowLanguagePopup(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.classList.toggle("lang-hi", language === "hi");
  }, [language]);

  /** The only path that persists to storage — an explicit user action
     (popup choice or header toggle), never an automatic default. */
  function persist(lang: Language) {
    setLanguageState(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  const toggleLanguage = () => persist(language === "en" ? "hi" : "en");

  const chooseLanguage = (lang: Language) => {
    persist(lang);
    setShowLanguagePopup(false);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, showLanguagePopup, chooseLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/** Pick the string/JSX for the current language from a {en, hi} pair. */
export function useT<T>(pair: { en: T; hi: T }): T {
  const { language } = useLanguage();
  return pair[language];
}
