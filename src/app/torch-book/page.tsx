import type { Metadata } from "next";
import TorchBookViewer from "./TorchBookViewer";

export const metadata: Metadata = {
  title: "Torch Book – KAVERY Lighting Collection 2026 | KAG Batteries",
  description:
    "Flip through the full KAVERY Lighting Collection 2026 torch book exactly like a printed book — every torch model, spec sheet and price tier in one place. Download the PDF or ask on WhatsApp.",
  openGraph: {
    title: "KAVERY Lighting Collection 2026 – Digital Torch Book",
    description: "A page-by-page digital flip-through of the full KAVERY torch collection, from KAG Batteries.",
    type: "website",
    siteName: "KAG Batteries",
  },
};

export default function TorchBookPage() {
  return <TorchBookViewer />;
}
