"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { DEALER_WHATSAPP } from "@/data/products";
import styles from "./Contact.module.css";
import { useLanguage, type Language } from "./LanguageContext";

type FormState = { contactPerson: string; companyName: string; phone: string; city: string; state: string; inquiryType: string; estimatedQty: string; message: string };
const initialForm: FormState = { contactPerson: "", companyName: "", phone: "", city: "", state: "", inquiryType: "", estimatedQty: "", message: "" };

const trustStats: Record<Language, [string, string][]> = {
  en: [
    ["1997", "Family-run, still growing"],
    ["120+ / 300+", "Distributors and retailers"],
    ["Factory-direct", "No middlemen on pricing"],
    ["WhatsApp", "Real replies, not hold music"],
  ],
  hi: [
    ["1997", "परिवार चलाता है, बढ़ता जा रहा है"],
    ["120+ / 300+", "डिस्ट्रिब्यूटर्स और रिटेलर्स"],
    ["फैक्ट्री-डायरेक्ट", "कीमत में कोई बिचौलिया नहीं"],
    ["WhatsApp", "असली जवाब, होल्ड म्यूज़िक नहीं"],
  ],
};

const copy = {
  en: {
    eyebrow: "Join the KAG family",
    title: (
      <>
        Why wait to join <em className="text-[#ff7900] not-italic">the family?</em>
      </>
    ),
    body: "Genuine products, honest pricing and replies that actually come fast—that's what dealers get from day one. Twenty-seven years in, we're still the name shopkeepers ask for by name.",
    successLabel: "Message received",
    successTitle: "Thank you. The KAG team will be in touch.",
    successBody: "During working hours, our team usually responds within two hours. For the fastest route, you can also message sales on WhatsApp.",
    openWhatsapp: "Open WhatsApp",
    fields: {
      name: "Your name",
      namePh: "Full name",
      company: "Shop or company",
      companyPh: "Business name",
      phone: "Mobile number",
      phonePh: "+91 00000 00000",
      city: "City",
      cityPh: "Indore",
      state: "State",
      statePh: "Madhya Pradesh",
      qty: "Monthly quantity",
      qtyPh: "Approx. units",
      inquiryLabel: "What are you looking for?",
      chooseOne: "Choose one",
      inquiryOptions: ["Dealer partnership", "Distributor partnership", "Bulk order", "Product information"],
      message: "Message",
      messagePh: "Tell us what you want to stock or order",
    },
    errorMsg: "We could not send the form right now. Please use WhatsApp for an immediate response.",
    sending: "Sending...",
    submit: "Send inquiry",
    preferWhatsapp: "Prefer WhatsApp?",
    whatsappMessage: "Hi KAG Batteries, I would like to know more about your products.",
  },
  hi: {
    eyebrow: "काग परिवार से जुड़ें",
    title: (
      <>
        परिवार से जुड़ने में <em className="text-[#ff7900] not-italic">देरी कैसी?</em>
      </>
    ),
    body: "असली प्रोडक्ट, ईमानदार कीमत और जवाब जो सच में जल्दी आता है—यही मिलता है डीलर को पहले दिन से। सत्ताईस साल बाद भी, दुकानदार आज भी नाम लेकर काग ही मांगते हैं।",
    successLabel: "मैसेज मिल गया",
    successTitle: "धन्यवाद। काग टीम जल्द संपर्क करेगी।",
    successBody: "काम के घंटों में, हमारी टीम आमतौर पर दो घंटे के अंदर जवाब देती है। सबसे तेज़ तरीके के लिए, आप WhatsApp पर भी सेल्स टीम को मैसेज कर सकते हैं।",
    openWhatsapp: "WhatsApp खोलें",
    fields: {
      name: "आपका नाम",
      namePh: "पूरा नाम",
      company: "दुकान या कंपनी",
      companyPh: "व्यवसाय का नाम",
      phone: "मोबाइल नंबर",
      phonePh: "+91 00000 00000",
      city: "शहर",
      cityPh: "इंदौर",
      state: "राज्य",
      statePh: "मध्य प्रदेश",
      qty: "मासिक मात्रा",
      qtyPh: "अनुमानित यूनिट",
      inquiryLabel: "आपको क्या चाहिए?",
      chooseOne: "एक चुनें",
      inquiryOptions: ["डीलर पार्टनरशिप", "डिस्ट्रिब्यूटर पार्टनरशिप", "बल्क ऑर्डर", "प्रोडक्ट जानकारी"],
      message: "मैसेज",
      messagePh: "बताएं आप क्या स्टॉक या ऑर्डर करना चाहते हैं",
    },
    errorMsg: "अभी फॉर्म भेज नहीं पाए। तुरंत जवाब के लिए कृपया WhatsApp इस्तेमाल करें।",
    sending: "भेजा जा रहा है...",
    submit: "पूछताछ भेजें",
    preferWhatsapp: "WhatsApp पसंद करेंगे?",
    whatsappMessage: "नमस्ते काग बैटरीज़, मुझे आपके प्रोडक्ट्स के बारे में और जानना है।",
  },
};

export default function Contact() {
  const { language } = useLanguage();
  const t = copy[language];
  const stats = trustStats[language];
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statIndex, setStatIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStatIndex((i) => (i + 1) % stats.length), 2400);
    return () => clearInterval(id);
  }, [stats.length]);

  function update(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error("Inquiry service unavailable");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  }

  const inputClass = "w-full border-b border-[#11120f]/15 bg-transparent px-0 py-3 text-base text-[#11120f] outline-none transition placeholder:text-[#11120f]/35 focus:border-[#ff7900]";
  const whatsapp = `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <section id="contact" className={`${styles.section} py-32 md:py-48`}>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:grid-cols-[.75fr_1.25fr] md:gap-24 md:px-10">
        <div data-reveal>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#ff7900]">{t.eyebrow}</p>
          <h2 className="font-display max-w-md text-6xl font-semibold leading-[0.9] tracking-[-0.05em] text-[#11120f] md:text-7xl">
            {t.title}
          </h2>
          <p className="mt-8 max-w-sm text-base leading-7 text-[#11120f]/65">
            {t.body}
          </p>

          <div className={styles.statRotator}>
            <div key={stats[statIndex][0]} className={styles.statCard}>
              <strong>{stats[statIndex][0]}</strong>
              <span>{stats[statIndex][1]}</span>
            </div>
            <div className={styles.statDots} aria-hidden="true">
              {stats.map(([value], index) => (
                <i key={value} className={index === statIndex ? styles.isOn : ""} />
              ))}
            </div>
          </div>
        </div>

        <div data-reveal>
          {status === "success" ? (
            <div className="flex min-h-[520px] flex-col justify-center rounded-[1.75rem] bg-[#071a1b] p-8 text-white md:p-14"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9f36b]">{t.successLabel}</p><h3 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-tight tracking-[-0.04em]">{t.successTitle}</h3><p className="mt-6 max-w-md leading-7 text-emerald-50/65">{t.successBody}</p><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#d9f36b] px-6 py-3.5 text-sm font-bold text-[#071a1b]">{t.openWhatsapp} <span aria-hidden="true">↗</span></a></div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-[#11120f]/10 bg-white/70 p-7 md:p-12">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">{t.fields.name}<input required value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className={inputClass} placeholder={t.fields.namePh} /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">{t.fields.company}<input required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputClass} placeholder={t.fields.companyPh} /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">{t.fields.phone}<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder={t.fields.phonePh} /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">{t.fields.city}<input required value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} placeholder={t.fields.cityPh} /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">{t.fields.state}<input required value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass} placeholder={t.fields.statePh} /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">{t.fields.qty}<input required type="number" min="1" value={form.estimatedQty} onChange={(e) => update("estimatedQty", e.target.value)} className={inputClass} placeholder={t.fields.qtyPh} /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45 md:col-span-2">{t.fields.inquiryLabel}<select required value={form.inquiryType} onChange={(e) => update("inquiryType", e.target.value)} className={inputClass}><option value="">{t.fields.chooseOne}</option>{t.fields.inquiryOptions.map((opt) => <option key={opt}>{opt}</option>)}</select></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45 md:col-span-2">{t.fields.message}<textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder={t.fields.messagePh} /></label>
              </div>
              {status === "error" && <p className="mt-6 border-l-2 border-amber-600 pl-3 text-sm leading-6 text-amber-800">{t.errorMsg}</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4"><button disabled={status === "sending"} type="submit" className="inline-flex items-center gap-3 rounded-full bg-[#11120f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#ff7900] disabled:cursor-wait disabled:opacity-60">{status === "sending" ? t.sending : t.submit}<span aria-hidden="true">↗</span></button><Link href={whatsapp} target="_blank" className="text-sm font-semibold text-[#11120f] underline decoration-[#11120f]/25 underline-offset-4 hover:text-[#ff7900]">{t.preferWhatsapp}</Link></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
