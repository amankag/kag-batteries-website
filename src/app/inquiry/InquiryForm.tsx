"use client";

import { useState } from "react";
import { initialProducts, DEALER_WHATSAPP } from "@/data/products";

const INQUIRY_TYPES = [
  "Dealer / Retailer",
  "Distributor",
  "Institutional / Bulk Buyer",
  "Export Inquiry",
] as const;

export default function InquiryForm() {
  const [form, setForm] = useState({
    contactPerson: "",
    companyName: "",
    phone: "",
    whatsapp: "",
    city: "",
    state: "",
    inquiryType: "" as (typeof INQUIRY_TYPES)[number] | "",
    estimatedQty: "",
    message: "",
  });

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function toggleProduct(id: number) {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const chosenProducts = initialProducts
      .filter((p) => selectedProducts.includes(p.id))
      .map((p) => `• ${p.name} (MRP ${p.pricingTiers[0].price})`)
      .join("\n");

    const text = [
      `*New Dealer Inquiry – KAG Batteries*`,
      ``,
      `*Contact:* ${form.contactPerson}`,
      `*Company:* ${form.companyName}`,
      `*Phone:* ${form.phone}`,
      form.whatsapp ? `*WhatsApp:* ${form.whatsapp}` : "",
      `*Location:* ${form.city}, ${form.state}`,
      `*Inquiry Type:* ${form.inquiryType}`,
      `*Est. Quantity:* ${form.estimatedQty} units/month`,
      ``,
      `*Products Interested In:*`,
      chosenProducts || "• All products (send catalogue)",
      ``,
      form.message ? `*Message:* ${form.message}` : "",
      ``,
      `Please share dealer pricing and terms. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all";

  const lithiumProducts = initialProducts.filter((p) => p.category === "lithium-ion");
  const leadAcidProducts = initialProducts.filter((p) => p.category === "lead-acid");

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Inquiry Sent!</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
          Your inquiry has been opened in WhatsApp. Our team responds within 2 hours during business hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-green-600 hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact details */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Contact Details
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Contact Person *
            </label>
            <input
              name="contactPerson"
              required
              value={form.contactPerson}
              onChange={handleChange}
              placeholder="Ramesh Kumar"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Company / Shop Name *
            </label>
            <input
              name="companyName"
              required
              value={form.companyName}
              onChange={handleChange}
              placeholder="Kumar Traders, Indore"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Mobile Number *
            </label>
            <input
              name="phone"
              required
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="98765 43210"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              WhatsApp Number
            </label>
            <input
              name="whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="Same as mobile if same"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              City *
            </label>
            <input
              name="city"
              required
              value={form.city}
              onChange={handleChange}
              placeholder="Bhopal"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              State *
            </label>
            <input
              name="state"
              required
              value={form.state}
              onChange={handleChange}
              placeholder="Madhya Pradesh"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Inquiry type + qty */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Inquiry Type *
          </label>
          <select
            name="inquiryType"
            required
            value={form.inquiryType}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select type...</option>
            {INQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Estimated Monthly Quantity *
          </label>
          <input
            name="estimatedQty"
            required
            type="number"
            min="10"
            value={form.estimatedQty}
            onChange={handleChange}
            placeholder="e.g. 100"
            className={inputClass}
          />
        </div>
      </div>

      {/* Product selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Products Interested In
          </p>
          <button
            type="button"
            onClick={() =>
              setSelectedProducts(
                selectedProducts.length === initialProducts.length
                  ? []
                  : initialProducts.map((p) => p.id)
              )
            }
            className="text-xs font-semibold text-green-600 hover:underline"
          >
            {selectedProducts.length === initialProducts.length ? "Deselect all" : "Select all"}
          </button>
        </div>

        {/* Lithium-Ion group */}
        <div className="mb-4">
          <p className="text-xs font-bold text-green-700 bg-green-50 rounded-lg px-3 py-1.5 mb-2 inline-block">
            Lithium-Ion Models
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lithiumProducts.map((p) => (
              <label
                key={p.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedProducts.includes(p.id)
                    ? "border-green-400 bg-green-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 accent-green-600 flex-shrink-0"
                  checked={selectedProducts.includes(p.id)}
                  onChange={() => toggleProduct(p.id)}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.specs.batteryCapacity} · {p.pricingTiers[0].price}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Lead Acid group */}
        <div>
          <p className="text-xs font-bold text-blue-700 bg-blue-50 rounded-lg px-3 py-1.5 mb-2 inline-block">
            Lead Acid Models
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {leadAcidProducts.map((p) => (
              <label
                key={p.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedProducts.includes(p.id)
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-0.5 accent-blue-600 flex-shrink-0"
                  checked={selectedProducts.includes(p.id)}
                  onChange={() => toggleProduct(p.id)}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.specs.batteryCapacity} · {p.pricingTiers[0].price}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <p className="text-xs text-green-600 font-semibold mt-2">
            {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1.5">
          Additional Message
        </label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Territory you cover, existing brands you sell, specific requirements..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-3 rounded-2xl bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold py-4 text-base transition-all shadow-lg shadow-green-200"
      >
        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.0117 21C6.68166 21 2.3457 16.5361 2.3457 11.0498C2.3457 5.54883 6.69141 1.09961 12.0264 1.09961C17.3662 1.09961 21.7119 5.54883 21.7119 11.0498C21.7119 16.5361 17.3662 21 12.0117 21ZM12.0117 2.19336C7.2793 2.19336 3.4082 6.16699 3.4082 11.0498C3.4082 15.9326 7.2793 19.9062 12.0117 19.9062C16.7441 19.9062 20.6494 15.9326 20.6494 11.0498C20.6494 6.16699 16.7441 2.19336 12.0117 2.19336ZM16.0391 14.7393C15.8633 15.2227 15.2422 15.4268 14.8145 15.3535C14.3311 15.2754 12.3086 14.7002 9.94434 12.2617C7.57031 9.81348 7.02344 7.73828 6.94043 7.24512C6.8623 6.81152 7.0625 6.18164 7.53125 5.99609C7.83887 5.86914 8.08203 5.87402 8.24219 5.89844C8.58398 5.92773 8.65723 5.94238 8.81836 6.32324C9.02344 6.80664 9.47754 7.91016 9.53125 8.02246C9.58496 8.14453 9.61426 8.28125 9.55566 8.42285C9.4873 8.56934 9.42383 8.65723 9.17969 8.91602C8.94043 9.1748 8.91602 9.22363 8.96973 9.38965C9.07715 9.71191 9.63867 10.8789 10.4541 11.7236C11.5137 12.8223 12.3926 13.0615 12.7295 13.1201C12.8906 13.1494 12.9834 13.0908 13.208 12.8418C13.4668 12.5488 13.7842 12.085 13.9111 11.9678C14.0723 11.8164 14.248 11.8311 14.4336 11.9092C14.624 11.9824 15.6592 12.4951 15.8691 12.6074C16.0889 12.7148 16.2305 12.7686 16.2939 12.876C16.3574 12.9834 16.3574 13.4717 16.0391 14.7393Z" />
        </svg>
        Send Inquiry via WhatsApp
      </button>

      <p className="text-center text-xs text-slate-400">
        This opens WhatsApp with your inquiry pre-filled. Our team responds within 2 hours (Mon–Sat, 10am–7pm).
      </p>
    </form>
  );
}
