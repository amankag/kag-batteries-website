export interface ProductSpecs {
  reflector?: string;
  beamDistance?: string;
  switchType?: string;
  body?: string;
  sideLight?: string;
  features?: string;
  batteryType?: string;
  batteryCapacity?: string;
}

export interface PricingTier {
  label: string;
  moq: string;
  price: string;
  locked: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  category: "lithium-ion" | "lead-acid";
  specs: ProductSpecs;
  pricingTiers: PricingTier[];
  image?: string;
  colors?: { name: string; hex: string; type?: "body" | "trim" }[];
}

export const DEALER_WHATSAPP = "919826918636";

export const initialProducts: Product[] = [
  {
    id: 1,
    slug: "model-kb-555",
    name: "Model KB-555",
    tagline: "12000 mAh | 110mm Deep Reflector | Power Bank",
    description:
      "The KAG Surya KB-555 is a 3.7V lithium-ion rechargeable torch with a 12000 mAh battery, power-bank output and a 110mm deep reflector. The brochure positions it for long-distance lighting, farms, emergency use and extended outdoor work.",
    highlights: [
      "12000 mAh lithium-ion battery",
      "Power bank feature — charge your phone on-the-go",
      "110mm deep aluminium reflector",
      "Power bank output for mobile charging",
      "Long-distance beam for outdoor and emergency use",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "12000 mAh",
      reflector: "110mm Deep Aluminium",
      beamDistance: "Long Distance",
      body: "Strong ABS",
      features: "Power Bank, 3X Battery Life",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,850", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹1,420", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹1,180", locked: true },
    ],
    image: "/product-images/51d42876-58d1-4e6d-a7c6-c2d1bea7933a.png",
    colors: [
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Black", hex: "#1F2937", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
    ],
  },
  {
    id: 2,
    slug: "safari-model-kb-66",
    name: "Safari – Model KB-66",
    tagline: "Dry Lead Acid | 35W Reflector | 12 SMD",
    description:
      "The KAG Safari range is a rechargeable power-bank torch with a dry lead-acid battery, 35W long-beam reflector and 12 SMD super-bright side light. The brochure shows the family in multiple colour variants with a built-in stand cover.",
    highlights: [
      "Dry lead-acid battery",
      "12 SMD LED side light for ambient coverage",
      "35W OSRAM reflector",
      "Power bank and USB charger",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Dry Lead Acid",
      batteryCapacity: "Dry Lead Acid",
      reflector: "35W OSRAM",
      sideLight: "12 SMD LED",
      body: "Strong Body",
      features: "Power Bank, USB Charger",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,200", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹920", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹760", locked: true },
    ],
    image: "/product-images/0b23afc0-b570-41d4-89ed-29646aa357f1.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
    ],
  },
  {
    id: 3,
    slug: "nano-comfort-model-kb-99",
    name: "Nano Comfort – Model KB-99",
    tagline: "5000 mAh | 75mm Deep Reflector | 3X Battery Life",
    description:
      "The KAG Nano Comfort KB-99 is a 5000 mAh lithium-ion rechargeable torch with 3X battery life, a 75mm deep reflector and a 12 SMD side light. Its comfortable grip and easy-open service design make it suitable for homes and retail counters.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "12 SMD LED side light",
      "75mm deep reflector",
      "3X battery life",
      "Comfort grip — reduces hand fatigue",
      "Ideal for homes and small retail",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      reflector: "75mm Deep",
      sideLight: "12 SMD LED",
      body: "Comfort Grip",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/88685858-bba5-4c70-a6c8-7b81003aa6fa.png",
    colors: [
      { name: "Green", hex: "#16A34A", type: "body" },
      { name: "Black", hex: "#1F2937", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Red", hex: "#DC2626", type: "trim" },
    ],
  },
  {
    id: 4,
    slug: "sonata-model-kb-770",
    name: "Sonata – Model KB-770",
    tagline: "Dry Lead Acid | 12 SMD LED | Power Bank",
    description:
      "The KAG Sonata is a rechargeable power-bank torch with a dry lead-acid battery, high-brightness 12 SMD side LED and USB mobile charging. The brochure shows a heavy-duty body and multiple colour variants for practical retail and household use.",
    highlights: [
      "Dry lead-acid battery",
      "Power bank and USB charger",
      "12 SMD LED side light",
      "Heavy-duty body with multiple colour variants",
      "Economical rechargeable design",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "Dry Lead Acid",
      sideLight: "12 SMD LED",
      body: "Heavy Duty",
      features: "Power Bank, USB Charger",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹750", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹580", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹480", locked: true },
    ],
    image: "/product-images/efdf10ce-60c0-483c-8cba-31168e514c54.png",
    colors: [
      { name: "Yellow", hex: "#EAB308", type: "trim" },
      { name: "Red", hex: "#DC2626", type: "trim" },
      { name: "Pink", hex: "#DB2777", type: "trim" },
      { name: "Green", hex: "#16A34A", type: "trim" },
    ],
  },
  {
    id: 5,
    slug: "curve-model-kb-55",
    name: "Curve – Model KB-55",
    tagline: "CREE LED | 2 Tube Light | Double Switch",
    description:
      "The KAG Curve is a rechargeable torch with a distinctive curved body, CREE LED, two tube lights and a double-switch control. The brochure highlights long-beam focus, long battery backup and multiple colour variants.",
    highlights: [
      "CREE LED main beam",
      "Two tube lights for wider coverage",
      "Double-switch control",
      "Long battery backup and multiple colours",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      reflector: "CREE LED",
      switchType: "Double Switch",
      sideLight: "2 Tube Light",
      body: "Curve Ergonomic",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,050", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹810", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹670", locked: true },
    ],
    image: "/product-images/3be40299-0ee8-43e4-b296-5302a4496ff5.png",
    colors: [
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Black", hex: "#1F2937", type: "body" },
    ],
  },
  {
    id: 6,
    slug: "deepshikha-model-ke450",
    name: "Deepshikha – Model KE450",
    tagline: "4000 mAh | 3X Life | Reliable Performance",
    description:
      "The KAG Deepshikha KE450 is engineered for reliability. Its 3X battery life technology ensures maximum hours of bright illumination per charge. This model is not shown in the supplied 2026 PDF and is retained as a website-only listing pending catalogue confirmation.",
    highlights: [
      "4000 mAh lithium-ion battery",
      "3X battery life technology",
      "Consistent brightness throughout charge",
      "Affordable entry-level lithium choice",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "4000 mAh",
      body: "Durable ABS",
      features: "3X Battery Life",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹850", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹650", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹540", locked: true },
    ],
    image: "/product-images/8aa0b7c5-be6d-45c4-8ed3-3b5bdb725d74.png",
  },
  {
    id: 7,
    slug: "jio-model-kb-88",
    name: "Jio – Model KB-88",
    tagline: "50W / 100W / 150W | Li-ion / Lead Acid | 14 LED Backside",
    description:
      "The KAG Jio family is shown in the brochure with 50W, 100W and 150W variants, available in lithium-ion and lead-acid builds. Its long-distance aluminium reflector and 14 LED backside light are designed for high-output outdoor use.",
    highlights: [
      "50W / 100W / 150W power variants",
      "Long-distance aluminium reflector",
      "14 LED backside light",
      "Lithium-ion and lead-acid options",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      reflector: "Long Distance Aluminium",
      body: "Strong Body",
      features: "50W / 100W / 150W, 14 LED Backside",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/new/jio-hipower.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
    ],
  },
  {
    id: 8,
    slug: "jio-model-kb-880",
    name: "Jio – Model KB-880",
    tagline: "50W / 100W / 150W | Li-ion / Lead Acid | 14 LED Backside",
    description:
      "The KAG Jio family is shown in the brochure with 50W, 100W and 150W variants, available in lithium-ion and lead-acid builds. This lead-acid website listing represents the heavy-duty option for long-distance outdoor lighting.",
    highlights: [
      "50W / 100W / 150W power variants",
      "Long-distance aluminium reflector",
      "14 LED backside light",
      "Lead-acid option for heavy-duty use",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 9Ah",
      reflector: "Long Distance Aluminium",
      body: "Heavy Duty",
      features: "50W / 100W / 150W, 14 LED Backside",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/new/jio-hipower.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
    ],
  },
  {
    id: 9,
    slug: "star-beam-model-kb-22",
    name: "Star Beam – Model KB-22",
    tagline: "Heavy Duty Transformer | Dry / Liquid Battery | Rechargeable",
    description:
      "The KAG Star Beam is a rechargeable torch family built around a heavy-duty transformer. The brochure lists dry and liquid battery variants in multiple colours, making it suitable for dependable household, farm and security use.",
    highlights: [
      "Heavy-duty transformer",
      "Rechargeable dry or liquid battery variants",
      "Long-range focused beam",
      "Multiple colour variants",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Dry / Liquid Battery",
      beamDistance: "Long Range",
      body: "Strong Body",
      features: "Heavy Duty Transformer, Rechargeable",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,100", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹850", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹700", locked: true },
    ],
    image: "/product-images/k22.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Green", hex: "#16A34A", type: "body" },
      { name: "Blue", hex: "#2563EB", type: "body" },
    ],
  },
  {
    id: 10,
    slug: "star-beam-model-kb-220",
    name: "Star Beam – Model KB-220",
    tagline: "Heavy Duty Transformer | Dry / Liquid Battery | Rechargeable",
    description:
      "The KAG Star Beam is a rechargeable torch family built around a heavy-duty transformer. The brochure lists dry and liquid battery variants in multiple colours, with the KB-220 website entry retained as a family variant until the exact brochure model code is confirmed.",
    highlights: [
      "Heavy-duty transformer",
      "Rechargeable dry or liquid battery variants",
      "Focused long-range beam",
      "Multiple colour variants",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Dry / Liquid Battery",
      beamDistance: "Focused Long Range",
      body: "Compact",
      features: "Heavy Duty Transformer, Rechargeable",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/220.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Green", hex: "#16A34A", type: "body" },
      { name: "Blue", hex: "#2563EB", type: "body" },
    ],
  },
  {
    id: 11,
    slug: "tez-model-kb-121",
    name: "Tez – Model KB-121",
    tagline: "25W | 4V Dry Battery | 1Km Focus | 15 SMD",
    description:
      "The KAG Tez family is shown in the brochure with a 25W OSRAM Power LED, 4V dry battery, 1Km focus range and 15 SMD side light. The KB-121 website entry is retained as the lithium-ion family variant until the exact brochure model code is confirmed.",
    highlights: [
      "25W OSRAM Power LED",
      "4V dry battery family platform",
      "1Km focus range",
      "15 SMD LED side light",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "4V Dry Battery",
      batteryCapacity: "4V",
      reflector: "OSRAM Power LED",
      beamDistance: "1Km",
      sideLight: "15 SMD LED",
      body: "Strong Body",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹850", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹650", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹540", locked: true },
    ],
    image: "/product-images/d78c23f6-3f15-4593-96ec-ef729be4d229.png",
    colors: [
      { name: "Blue", hex: "#2563EB", type: "body" },
      { name: "Green", hex: "#16A34A", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
    ],
  },
  {
    id: 12,
    slug: "tez-model-kb-120",
    name: "Tez – Model KB-120",
    tagline: "25W | 4V Dry Battery | 1Km Focus | 15 SMD",
    description:
      "The KAG Tez family is shown in the brochure with a 25W OSRAM Power LED, 4V dry battery, 1Km focus range and 15 SMD side light. The KB-120 website entry is retained as the lead-acid family variant until the exact brochure model code is confirmed.",
    highlights: [
      "25W OSRAM Power LED",
      "4V dry battery family platform",
      "1Km focus range",
      "15 SMD LED side light",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "4V Dry Battery",
      batteryCapacity: "4V",
      reflector: "OSRAM Power LED",
      beamDistance: "1Km",
      sideLight: "15 SMD LED",
      body: "Standard",
      features: "Strong Beam",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹650", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹500", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹415", locked: true },
    ],
    image: "/product-images/abbb458f-cafa-4637-aa51-5895a0acae51.png",
    colors: [
      { name: "Blue", hex: "#2563EB", type: "body" },
      { name: "Green", hex: "#16A34A", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
    ],
  },
  {
    id: 13,
    slug: "commando-model-kb-44",
    name: "Commando – Model KB-44",
    tagline: "4V 2.5Ah | 75mm Aluminium Reflector | 12 SMD",
    description:
      "The KAG Commando is a rechargeable torch with a 4V 2.5Ah imported dry battery, 75mm aluminium reflector, 12 SMD side LED and waterproof switch. The brochure positions it for dependable household, security and outdoor use.",
    highlights: [
      "4V 2.5Ah imported dry battery",
      "75mm aluminium reflector",
      "12 SMD side LED",
      "Waterproof switch and fast charging",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Imported Dry Battery",
      batteryCapacity: "4V 2.5Ah",
      reflector: "75mm Aluminium",
      sideLight: "12 SMD LED",
      switchType: "Waterproof Switch",
      body: "Tactical Shockproof ABS",
      features: "OSRAM LED, Fast Charging",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,200", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹920", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹760", locked: true },
    ],
    image: "/product-images/63b2c61a-8d5e-4629-8eeb-9cc60a0455ad.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Green", hex: "#16A34A", type: "body" },
    ],
  },
  {
    id: 14,
    slug: "nano-gold-model-kb-11",
    name: "Nano Gold – Model KB-11",
    tagline: "4V Battery | 55mm Aluminium Reflector | Waterproof Switch",
    description:
      "The KAG Nano Gold is a rechargeable torch with a 4V battery, OSRAM LED, heavy-duty battery, fast charging, 55mm aluminium reflector and waterproof switch. The brochure lists it as a compact, serviceable option for everyday lighting.",
    highlights: [
      "4V battery with heavy-duty construction",
      "OSRAM LED and fast charging",
      "55mm aluminium reflector",
      "Waterproof switch",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "4V Battery",
      batteryCapacity: "4V",
      reflector: "55mm Aluminium",
      beamDistance: "Long Range",
      body: "ABS",
      features: "OSRAM LED, Fast Charging, Waterproof Switch",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/0cc83f6f-01ac-4ff0-9357-53bb42c2d7f1.png",
  },
  {
    id: 15,
    slug: "nano-classic-model-kb-110",
    name: "Nano Classic – Model KB-110",
    tagline: "4V Battery | 55mm Aluminium Reflector | SMPS Charger",
    description:
      "The KAG Nano Classic is a rechargeable torch with a 4V battery, SMPS battery charger, OSRAM LED, heavy-duty battery, fast charging, 55mm aluminium reflector and switch protector. The brochure presents it as a dependable everyday model.",
    highlights: [
      "4V battery with heavy-duty construction",
      "SMPS battery charger and fast charging",
      "OSRAM LED with 55mm aluminium reflector",
      "Switch protector for daily use",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 4.5Ah",
      reflector: "55mm Aluminium",
      switchType: "Switch Protector",
      body: "Classic PP",
      features: "OSRAM LED, Fast Charging, SMPS Charger",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹700", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹540", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹445", locked: true },
    ],
    image: "/product-images/97210700-73d9-42bd-a663-ba7f999a096e.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
    ],
  },
  {
    id: 16,
    slug: "lockdown-model-kb-130",
    name: "Lockdown – Model KB-130",
    tagline: "Extra Powerful Side LED | Heavy Duty | Rechargeable",
    description:
      "The KAG Lockdown is a rechargeable torch with an extra powerful side LED for wider practical illumination. Its heavy-duty body and high-beam output make it suitable for security, household and outdoor use.",
    highlights: [
      "Extra powerful side LED",
      "Heavy-duty rechargeable construction",
      "High-beam performance for premises coverage",
      "Solid grip body for daily security use",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 3Ah",
      beamDistance: "Long Beam",
      sideLight: "Extra Powerful Side LED",
      body: "Solid Grip",
      features: "Rechargeable, High Beam",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹650", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹500", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹415", locked: true },
    ],
    image: "/product-images/da0dc403-f103-4957-8774-32bec4ca6213.png",
    colors: [
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Black", hex: "#1F2937", type: "body" },
    ],
  },
  {
    id: 17,
    slug: "mini-hungama-model-kb-140",
    name: "Mini Hungama – Model KB-140",
    tagline: "4V | Extra Powerful Side LED | Multiple Colours",
    description:
      "The KAG Mini Hungama is a 4V rechargeable torch with an extra powerful side LED. The brochure shows multiple colour variants for practical everyday and emergency lighting.",
    highlights: [
      "4V rechargeable platform",
      "Extra powerful side LED",
      "High-beam output in a compact body",
      "Multiple colour variants",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V",
      sideLight: "Extra Powerful Side LED",
      body: "Compact",
      features: "Rechargeable, High Beam",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹600", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹460", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹380", locked: true },
    ],
    image: "/product-images/6483f3d0-fee8-4aa0-a200-310f3b43e68a.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
    ],
  },
  {
    id: 18,
    slug: "kisan-sainik-model-kb-80",
    name: "Kisan Sainik – Model KB-80",
    tagline: "7500 mAh | 80mm Deep Laser Reflector | USB Charging",
    description:
      "The KAG Kisan Sainik KB-80 is a high-capacity lithium-ion rechargeable torch with a 7500 mAh battery, 80mm deep laser reflector and USB/mobile charging. The brochure also shows a 4V 9Ah lead-acid variant callout for buyers who need a serviceable heavy-duty platform.",
    highlights: [
      "7500 mAh lithium-ion battery",
      "80mm deep laser reflector",
      "USB and mobile charging",
      "4V 9Ah lead-acid variant shown in brochure",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion / Lead Acid Variant",
      batteryCapacity: "7500 mAh / 4V 9Ah Variant",
      reflector: "80mm Deep Laser",
      features: "USB Charging, Mobile Charging",
      body: "Heavy Duty",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,150", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "Contact", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "Contact", locked: true },
    ],
    image: "/product-images/new/kisan-sainik-kb80.png",
    colors: [
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Black", hex: "#1F2937", type: "body" },
    ],
  },
  {
    id: 19,
    slug: "tiger-model-kb-81",
    name: "Tiger – Model KB-81",
    tagline: "5000 mAh | 80mm Deep Laser Reflector | Heavy Duty",
    description:
      "The KAG Tiger KB-81 is a heavy-duty rechargeable torch with a 5000 mAh lithium-ion battery and 80mm deep laser reflector. The brochure also calls out a 4V 5Ah lead-acid variant with an auto-cut adapter.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "80mm deep laser reflector",
      "Heavy-duty body for demanding use",
      "Lead-acid variant with auto-cut adapter",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion / Lead Acid Variant",
      batteryCapacity: "5000 mAh / 4V 5Ah Variant",
      reflector: "80mm Deep Laser",
      features: "Auto-Cut Adapter, Heavy Duty",
      body: "Heavy Duty",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,050", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "Contact", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "Contact", locked: true },
    ],
    image: "/product-images/new/tiger-kb81.png",
    colors: [
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Black", hex: "#1F2937", type: "body" },
      { name: "Yellow", hex: "#EAB308", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
    ],
  },
  {
    id: 20,
    slug: "venus-model-kb-68",
    name: "Venus – Model KB-68",
    tagline: "5000 mAh | 68mm Deep Laser Reflector | 3X Battery Life",
    description:
      "The KAG Venus KB-68 is a rechargeable torch with a 5000 mAh lithium-ion battery, 68mm deep laser reflector and 3X battery life. The brochure also shows a 4V 4.5Ah lead-acid variant callout.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "68mm deep laser reflector",
      "3X battery life",
      "4V 4.5Ah lead-acid variant shown in brochure",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion / Lead Acid Variant",
      batteryCapacity: "5000 mAh / 4V 4.5Ah Variant",
      reflector: "68mm Deep Laser",
      features: "3X Battery Life",
      body: "Durable Body",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,000", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "Contact", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "Contact", locked: true },
    ],
    image: "/product-images/new/venus-kb68.png",
    colors: [
      { name: "Black", hex: "#1F2937", type: "body" },
      { name: "Red", hex: "#DC2626", type: "body" },
      { name: "Orange", hex: "#EA580C", type: "body" },
      { name: "Green", hex: "#16A34A", type: "body" },
    ],
  },
  {
    id: 21,
    slug: "champion-model",
    name: "Champion",
    tagline: "4W Li-ion | 55mm Aluminium Reflector | COB Side LED",
    description:
      "The KAG Champion is a compact lithium-ion torch with a 4W output, 55mm aluminium reflector, COB side LED, micro USB charging and a 3-way slide switch. It is a practical everyday rechargeable model from the supplied brochure.",
    highlights: [
      "4W lithium-ion torch",
      "55mm aluminium reflector",
      "COB side LED",
      "Micro USB charging",
      "3-way slide switch",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      reflector: "55mm Aluminium",
      sideLight: "COB Side LED",
      switchType: "3-Way Slide Switch",
      features: "4W, Micro USB Charging",
      body: "Compact",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "Contact", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "Contact", locked: true },
    ],
    image: "/product-images/new/champion.png",
  },
  {
    id: 22,
    slug: "power-house-roxy",
    name: "Power House Roxy",
    tagline: "15W | High-Power LED | Long-Distance Aluminium Reflector",
    description:
      "The KAG Power House Roxy is a high-power rechargeable torch with a dry battery, 15W output, high-power LED and long-distance aluminium reflector. It is a brochure-listed model currently missing from the website catalogue.",
    highlights: [
      "15W high-power LED",
      "Dry battery platform",
      "Long-distance aluminium reflector",
      "Heavy-duty power-house design",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Dry Battery",
      batteryCapacity: "Dry Battery",
      reflector: "Long Distance Aluminium",
      features: "15W, High-Power LED",
      body: "Heavy Duty",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,100", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "Contact", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "Contact", locked: true },
    ],
    image: "/product-images/new/power-house-roxy.png",
  },
];
