"use client";

import { useState } from "react";
import { DEALER_WHATSAPP } from "@/data/products";

interface Props {
  productName: string;
}

export default function BulkInquiryForm({ productName }: Props) {
  const [form, setForm] = useState({
    name: "",
    business: "",
    city: "",
    phone: "",
    quantity: "",
    message: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Hi, I'd like to place a bulk order inquiry for *${productName}*.`,
      ``,
      `*Name:* ${form.name}`,
      `*Business:* ${form.business}`,
      `*City:* ${form.city}`,
      `*Phone:* ${form.phone}`,
      `*Quantity Required:* ${form.quantity} units`,
      form.message ? `*Message:* ${form.message}` : "",
      ``,
      `Please share dealer/distributor pricing. Thank you!`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${DEALER_WHATSAPP}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Your Name *
          </label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Ramesh Kumar"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            Business / Shop Name *
          </label>
          <input
            name="business"
            required
            value={form.business}
            onChange={handleChange}
            placeholder="Kumar Electronics, Indore"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            City / State *
          </label>
          <input
            name="city"
            required
            value={form.city}
            onChange={handleChange}
            placeholder="Bhopal, MP"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
            WhatsApp Number *
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
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Quantity Required *
        </label>
        <input
          name="quantity"
          required
          type="number"
          min="10"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Minimum 10 units"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-slate-400">Minimum 10 units for bulk pricing</p>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Additional Message
        </label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Any specific requirements, delivery location, etc."
          className={`${inputClass} resize-none`}
        />
      </div>

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
        This will open WhatsApp with your inquiry pre-filled. Our team responds within 2 hours.
      </p>
    </form>
  );
}
