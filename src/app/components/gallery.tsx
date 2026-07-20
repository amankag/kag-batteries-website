import Image from "next/image";

const images = [
  ["/images/Copy of IMG_5876.jpg", "People behind the product"],
  ["/images/Copy of IMG_5877.jpg", "A closer look at the range"],
  ["/images/Copy of IMG_5897.jpg", "Production in motion"],
  ["/images/Copy of IMG_5910.jpg", "Ready for dispatch"],
  ["/images/Copy of IMG_5997.jpg", "Built for the counter"],
];

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#071a1b] py-32 text-white md:py-48">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-7 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#d9f36b]">Inside the work</p>
            <h2 className="font-display max-w-2xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] md:text-7xl">Proof you can see.</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-emerald-50/60">Our factory, our people and the products that leave Indore for the next long night.</p>
        </div>
        <div className="grid grid-cols-12 gap-4 md:auto-rows-[160px]" data-reveal>
          {images.map(([src, alt], index) => (
            <div key={src} className={`group relative min-h-[230px] overflow-hidden rounded-[1.5rem] bg-slate-900 md:min-h-0 ${index === 0 ? "col-span-12 md:col-span-7 md:row-span-3" : index === 1 ? "col-span-6 md:col-span-5 md:row-span-2" : index === 2 ? "col-span-6 md:col-span-5 md:row-span-2" : index === 3 ? "col-span-6 md:col-span-4 md:row-span-2" : "col-span-6 md:col-span-8 md:row-span-2"}`}>
              <Image data-image-reveal src={src} alt={alt} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent opacity-70" />
              <p className="absolute bottom-5 left-5 text-sm font-semibold text-white">{alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
