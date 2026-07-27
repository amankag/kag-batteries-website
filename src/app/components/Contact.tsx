"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { DEALER_WHATSAPP } from "@/data/products";
import styles from "./Contact.module.css";

type FormState = { contactPerson: string; companyName: string; phone: string; city: string; state: string; inquiryType: string; estimatedQty: string; message: string };
const initialForm: FormState = { contactPerson: "", companyName: "", phone: "", city: "", state: "", inquiryType: "", estimatedQty: "", message: "" };

const trustStats = [
  ["1997", "Family-run, still growing"],
  ["120+ / 300+", "Distributors and retailers"],
  ["Factory-direct", "No middlemen on pricing"],
  ["WhatsApp", "Real replies, not hold music"],
];

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
  const whatsapp = `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent("Hi KAG Batteries, I would like to know more about your products.")}`;

  return (
    <section id="contact" className={`${styles.section} py-32 md:py-48`}>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 md:grid-cols-[.75fr_1.25fr] md:gap-24 md:px-10">
        <div data-reveal>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#ff7900]">Join the KAG family</p>
          <h2 className="font-display max-w-md text-6xl font-semibold leading-[0.9] tracking-[-0.05em] text-[#11120f] md:text-7xl">
            Why wait to join <em className="text-[#ff7900] not-italic">the family?</em>
          </h2>
          <p className="mt-8 max-w-sm text-base leading-7 text-[#11120f]/65">
            Genuine products, honest pricing and replies that actually come fast—that&apos;s what dealers get from
            day one. Twenty-seven years in, we&apos;re still the name shopkeepers ask for by name.
          </p>

          <div className={styles.statGrid}>
            {trustStats.map(([value, label]) => (
              <div key={label} className={styles.statCard}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal>
          {status === "success" ? (
            <div className="flex min-h-[520px] flex-col justify-center rounded-[1.75rem] bg-[#071a1b] p-8 text-white md:p-14"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9f36b]">Message received</p><h3 className="mt-5 max-w-xl font-display text-5xl font-semibold leading-tight tracking-[-0.04em]">Thank you. The KAG team will be in touch.</h3><p className="mt-6 max-w-md leading-7 text-emerald-50/65">During working hours, our team usually responds within two hours. For the fastest route, you can also message sales on WhatsApp.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#d9f36b] px-6 py-3.5 text-sm font-bold text-[#071a1b]">Open WhatsApp <span aria-hidden="true">↗</span></a></div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-[#11120f]/10 bg-white/70 p-7 md:p-12">
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">Your name<input required value={form.contactPerson} onChange={(e) => update("contactPerson", e.target.value)} className={inputClass} placeholder="Full name" /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">Shop or company<input required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className={inputClass} placeholder="Business name" /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">Mobile number<input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="+91 00000 00000" /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">City<input required value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} placeholder="Indore" /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">State<input required value={form.state} onChange={(e) => update("state", e.target.value)} className={inputClass} placeholder="Madhya Pradesh" /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45">Monthly quantity<input required type="number" min="1" value={form.estimatedQty} onChange={(e) => update("estimatedQty", e.target.value)} className={inputClass} placeholder="Approx. units" /></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45 md:col-span-2">What are you looking for?<select required value={form.inquiryType} onChange={(e) => update("inquiryType", e.target.value)} className={inputClass}><option value="">Choose one</option><option>Dealer partnership</option><option>Distributor partnership</option><option>Bulk order</option><option>Product information</option></select></label>
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-[#11120f]/45 md:col-span-2">Message<textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Tell us what you want to stock or order" /></label>
              </div>
              {status === "error" && <p className="mt-6 border-l-2 border-amber-600 pl-3 text-sm leading-6 text-amber-800">We could not send the form right now. Please use WhatsApp for an immediate response.</p>}
              <div className="mt-8 flex flex-wrap items-center gap-4"><button disabled={status === "sending"} type="submit" className="inline-flex items-center gap-3 rounded-full bg-[#11120f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#ff7900] disabled:cursor-wait disabled:opacity-60">{status === "sending" ? "Sending..." : "Send inquiry"}<span aria-hidden="true">↗</span></button><Link href={whatsapp} target="_blank" className="text-sm font-semibold text-[#11120f] underline decoration-[#11120f]/25 underline-offset-4 hover:text-[#ff7900]">Prefer WhatsApp?</Link></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
