"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageContext";

export default function LanguagePopup() {
  const { showLanguagePopup, chooseLanguage } = useLanguage();

  if (!showLanguagePopup) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#071a1b]/70 p-5 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your language / अपनी भाषा चुनें"
    >
      <div className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-[#071a1b] p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:p-10">
        <div className="mx-auto mb-6 h-12 w-12 overflow-hidden rounded-2xl bg-white p-1.5">
          <div className="relative h-full w-full invert">
            <Image src="/kag-logo.png" alt="KAG Batteries" fill className="object-contain" />
          </div>
        </div>

        <p className="font-display text-xl font-semibold leading-snug text-white">
          Choose your language
        </p>
        <p className="mt-1 font-display text-xl font-semibold leading-snug text-white">
          अपनी भाषा चुनें
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => chooseLanguage("en")}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-base font-bold text-white transition hover:border-[#d9f36b] hover:bg-[#d9f36b] hover:text-[#071a1b]"
          >
            English
          </button>
          <button
            type="button"
            onClick={() => chooseLanguage("hi")}
            className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-base font-bold text-white transition hover:border-[#ff7900] hover:bg-[#ff7900] hover:text-white"
          >
            हिंदी
          </button>
        </div>

        <p className="mt-6 text-xs leading-5 text-emerald-50/45">
          You can switch anytime from the EN / हिं button at the top.
          <br />
          आप ऊपर दिए EN / हिं बटन से कभी भी बदल सकते हैं।
        </p>
      </div>
    </div>
  );
}
