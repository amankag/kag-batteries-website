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
const COOKIE_KEY = "kag-language";

/**
 * Root layout.tsx stays fully static (no cookies()/headers()) so the
 * other 3 routes (products, product detail, inquiry) keep static
 * generation. Only the homepage reads the `kag-language` cookie
 * server-side and passes the result in as initialLanguage/
 * initialHasChosen — for every other page these are left at their
 * defaults ("en/false") and corrected client-side after mount instead,
 * same as before this fix existed.
 *
 * That client-side correction is safe everywhere EXCEPT the hero's
 * typeGroup, which is why it's the one thing NOT relying on this
 * context for its initial paint (see hero.tsx's own initialLanguage
 * prop and the [data-lang] selectors in hero.module.css) — production
 * Lighthouse isolated typeGroup as the sole contributor to a 0.199 CLS
 * score from this exact client-side flip, and nothing else on the page
 * registered a shift, so the flip is left in place for the rest of the
 * page's Hindi text rather than paying for full-site dynamic rendering
 * to remove a shift that isn't actually happening elsewhere.
 *
 * An earlier attempt patched the flip with a blocking inline <script>
 * that set the CSS class before paint without also fixing what React
 * would render. That measurably made things worse (CLS 0.199 → 0.398):
 * the script fixed the CSS but `language` state still defaulted to
 * "en" and only updated post-hydration, so for one frame the page
 * showed Hindi CSS rules applied to English text — an extra mismatched
 * state, not a fix.
 */
export function LanguageProvider({
  children,
  initialLanguage = "en",
  initialHasChosen = false,
  trustInitialLanguage = false,
}: {
  children: ReactNode;
  initialLanguage?: Language;
  initialHasChosen?: boolean;
  /** true only when initialLanguage was resolved server-side (homepage,
      from the cookie) — skips the client-side localStorage re-check
      since the server value is already authoritative. */
  trustInitialLanguage?: boolean;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  // trustInitialLanguage only controls whether the localStorage re-check
  // effect below runs (server already resolved the value, so it's
  // redundant) — it must NOT also gate the popup, or a returning visitor
  // who genuinely never chose a language would never see it on the
  // homepage specifically, which is exactly the bug this fixes.
  const [showLanguagePopup, setShowLanguagePopup] = useState(!initialHasChosen);

  useEffect(() => {
    if (trustInitialLanguage) {
      // Server already resolved the correct value — no localStorage
      // lookup needed. Still have to sync the DOM class though: every
      // OTHER component on the homepage (WhyUsSection, InsideKagStory,
      // FactoryVisitSection, etc.) still keys its Hindi CSS off the
      // global html.lang-hi class, not the local [data-lang] pattern
      // hero.tsx uses — only hero itself was worth decoupling, since it
      // was the only one Lighthouse flagged. Root layout.tsx is static
      // and can't set this class server-side, so it has to happen here,
      // same brief-post-mount timing as every other page already uses
      // safely for everything except hero.
      document.documentElement.lang = language;
      document.documentElement.classList.toggle("lang-hi", language === "hi");
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "hi" || stored === "en") {
      setLanguageState(stored);
      document.documentElement.lang = stored;
      document.documentElement.classList.toggle("lang-hi", stored === "hi");
    } else {
      setShowLanguagePopup(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** The only path that persists a choice — an explicit user action
     (popup choice or header toggle), never an automatic default. Writes
     both the cookie (read server-side by the homepage on the next
     visit) and localStorage (read client-side by every other page). */
  function persist(lang: Language) {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.classList.toggle("lang-hi", lang === "hi");
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.cookie = `${COOKIE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
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
