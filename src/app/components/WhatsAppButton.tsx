'use client';

export default function WhatsAppButton() {
  // अपना नंबर यहां डालो – format: 91 + mobile (बिना +, space या 0)
  const phone = '919826918636'; // ← इसे अपने actual number से बदलना मत भूलना
  const message = encodeURIComponent('Hi, I am interested in your torch products.');
  const waLink = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-green-500 shadow-lg hover:bg-green-600 active:scale-95 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-6 h-6 text-white"
        fill="currentColor"
      >
        <path d="M16.04 4C9.94 4 4.98 8.96 4.98 15.06c0 2.4.78 4.63 2.1 6.45L6 28l6.64-2c1.74.96 3.73 1.51 5.8 1.51 6.1 0 11.06-4.96 11.06-11.06C29.5 8.96 22.14 4 16.04 4zm5.87 15.75c-.25.7-1.45 1.33-2.02 1.39-.52.05-1.17.07-1.89-.12-.44-.11-1-.33-1.73-.65-3.05-1.32-5.03-4.4-5.18-4.61-.15-.21-1.24-1.65-1.24-3.15 0-1.49.79-2.22 1.07-2.52.28-.3.61-.38.81-.38h.58c.19 0 .45-.07.71.54.27.65.92 2.25.99 2.41.08.16.13.35.03.56-.09.21-.14.34-.28.52-.15.17-.31.39-.44.52-.15.15-.31.31-.13.62.19.31.83 1.37 1.78 2.22 1.23 1.1 2.27 1.45 2.6 1.61.34.16.54.14.74-.09.2-.22.85-.99 1.08-1.33.23-.34.46-.28.77-.17.31.11 2.01.95 2.36 1.12.35.17.58.25.67.39.08.14.08.8-.17 1.5z" />
      </svg>
    </a>
  );
}
