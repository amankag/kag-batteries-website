"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, initialProducts } from "@/data/products";

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  // Filter products based on search term
  const filteredProducts = productList.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle temporary image upload preview
  const handleImageUpload = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProductList((prev) =>
        prev.map((p) => (p.id === id ? { ...p, image: imageUrl } : p))
      );
      // Determine the ideal path for the user to save the file
      const idealPath = `/images/${file.name}`;
      alert(`Preview updated! To make this permanent:\n1. Move '${file.name}' to 'public/images/' folder\n2. Update code to use '${idealPath}'`);
    }
  };

  return (
    <section id="products" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase mb-4">
            Our Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Explore Our <span className="text-green-600">Power Range</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-10">
            Engineered for durability and performance. Find the perfect lighting solution for your needs.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search by model name (e.g., L55, Safari)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full shadow-sm border border-slate-200 focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-slate-700 outline-none"
            />
            <svg
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-slate-100 flex flex-col"
              >
                {/* Image / Placeholder Area */}
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-300">
                      <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}

                  {/* Upload Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <label className="cursor-pointer bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(product.id, e)}
                      />
                    </label>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Specs Mini-Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {product.specs.beamDistance && (
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Range</span>
                        <span className="text-sm font-semibold text-slate-700">{product.specs.beamDistance}</span>
                      </div>
                    )}
                    {product.specs.body && (
                      <div className="bg-slate-50 p-2 rounded-lg">
                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Body</span>
                        <span className="text-sm font-semibold text-slate-700">{product.specs.body}</span>
                      </div>
                    )}
                    {product.specs.sideLight && (
                      <div className="bg-slate-50 p-2 rounded-lg col-span-2">
                        <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Side Light</span>
                        <span className="text-sm font-semibold text-slate-700">{product.specs.sideLight}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        const phone = "919826918636";
                        const msg = encodeURIComponent(`Hi, I'm interested in the ${product.name}. Please send me the price.`);
                        window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
                      }}
                      className="flex-1 bg-slate-900 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.0117 21C6.68166 21 2.3457 16.5361 2.3457 11.0498C2.3457 5.54883 6.69141 1.09961 12.0264 1.09961C17.3662 1.09961 21.7119 5.54883 21.7119 11.0498C21.7119 16.5361 17.3662 21 12.0117 21ZM12.0117 2.19336C7.2793 2.19336 3.4082 6.16699 3.4082 11.0498C3.4082 15.9326 7.2793 19.9062 12.0117 19.9062C16.7441 19.9062 20.6494 15.9326 20.6494 11.0498C20.6494 6.16699 16.7441 2.19336 12.0117 2.19336ZM16.0391 14.7393C15.8633 15.2227 15.2422 15.4268 14.8145 15.3535C14.3311 15.2754 12.3086 14.7002 9.94434 12.2617C7.57031 9.81348 7.02344 7.73828 6.94043 7.24512C6.8623 6.81152 7.0625 6.18164 7.53125 5.99609C7.83887 5.86914 8.08203 5.87402 8.24219 5.89844C8.58398 5.92773 8.65723 5.94238 8.81836 6.32324C9.02344 6.80664 9.47754 7.91016 9.53125 8.02246C9.58496 8.14453 9.61426 8.28125 9.55566 8.42285C9.4873 8.56934 9.42383 8.65723 9.17969 8.91602C8.94043 9.1748 8.91602 9.22363 8.96973 9.38965C9.07715 9.71191 9.63867 10.8789 10.4541 11.7236C11.5137 12.8223 12.3926 13.0615 12.7295 13.1201C12.8906 13.1494 12.9834 13.0908 13.208 12.8418C13.4668 12.5488 13.7842 12.085 13.9111 11.9678C14.0723 11.8164 14.248 11.8311 14.4336 11.9092C14.624 11.9824 15.6592 12.4951 15.8691 12.6074C16.0889 12.7148 16.2305 12.7686 16.2939 12.876C16.3574 12.9834 16.3574 13.4717 16.0391 14.7393Z" />
                      </svg>
                      Request Quote
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                      title="View Details"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-4 rounded-full bg-slate-50 mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </section>
  );
}