export const TORCH_BOOK_TITLE = "KAVERY Lighting Collection 2026";
export const TORCH_BOOK_PAGE_COUNT = 22;
export const TORCH_BOOK_PDF = "/brochures/KAVERY_Lighting_Collection_2026.pdf";

export interface TorchBookPage {
  src: string;
  thumb: string;
}

export const torchBookPages: TorchBookPage[] = Array.from(
  { length: TORCH_BOOK_PAGE_COUNT },
  (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `/torch-book/pages/page-${n}.webp`,
      thumb: `/torch-book/thumbs/page-${n}.webp`,
    };
  }
);
