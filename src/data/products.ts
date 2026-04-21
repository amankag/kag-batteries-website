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
}

export const DEALER_WHATSAPP = "919826918636";

export const initialProducts: Product[] = [
  {
    id: 1,
    slug: "model-kb-555",
    name: "Model KB-555",
    tagline: "12000 mAh | 115mm Reflector | 1500m Matchless Long Range",
    description:
      "The KAG KB-555 is our flagship high-capacity torch engineered for maximum range and backup. With a 12000 mAh lithium-ion battery it also doubles as a power bank for mobile devices — ideal for farms, construction sites, and extended outdoor use. The 115mm aluminium reflector delivers a beam reaching 1500 metres.",
    highlights: [
      "12000 mAh lithium-ion — longest backup in its class",
      "Power bank feature — charge your phone on-the-go",
      "115mm precision aluminium reflector",
      "1500m matchless long-range beam",
      "3X battery life vs. ordinary torches",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "12000 mAh",
      reflector: "115mm Aluminium",
      beamDistance: "1500m",
      body: "Strong ABS",
      features: "Power Bank, 3X Battery Life",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,850", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹1,420", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹1,180", locked: true },
    ],
    image: "/product-images/51d42876-58d1-4e6d-a7c6-c2d1bea7933a.png",
  },
  {
    id: 2,
    slug: "safari-model-kb-66",
    name: "Safari – Model KB-66",
    tagline: "6000 mAh | 12 SMD Side Light | High Power",
    description:
      "The KAG Safari KB-66 combines a powerful main beam with a 12 SMD LED side light for wide-area illumination. Perfect for security guards, farmers, and shop owners who need both focused and ambient lighting from a single torch.",
    highlights: [
      "6000 mAh lithium-ion battery",
      "12 SMD LED side light for ambient coverage",
      "High-power main beam",
      "Long backup for all-night use",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "6000 mAh",
      sideLight: "12 SMD LED",
      body: "Strong Body",
      features: "High Power, Long Backup",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,200", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹920", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹760", locked: true },
    ],
    image: "/product-images/0b23afc0-b570-41d4-89ed-29646aa357f1.png",
  },
  {
    id: 3,
    slug: "nano-comfort-model-kb-99",
    name: "Nano Comfort – Model KB-99",
    tagline: "5000 mAh | 12 SMD Side Light | Comfort Grip",
    description:
      "The KAG Nano Comfort KB-99 is designed for everyday household and retail use. Its ergonomic comfort grip reduces fatigue during extended use, while the 12 SMD side light provides broad area illumination.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "12 SMD LED side light",
      "Comfort grip — reduces hand fatigue",
      "Ideal for homes and small retail",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      sideLight: "12 SMD LED",
      body: "Comfort Grip",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/88685858-bba5-4c70-a6c8-7b81003aa6fa.png",
  },
  {
    id: 4,
    slug: "sonata-model-kb-770",
    name: "Sonata – Model KB-770",
    tagline: "4V-5Ah Lead Acid | 75mm Laser Reflector | 1500m Range",
    description:
      "The KAG Sonata KB-770 is a heavy-duty lead acid torch built for reliable long-range performance at an economical price. The 75mm laser reflector produces a tight 1500m beam, and the double switch design controls the main beam and side light independently.",
    highlights: [
      "4V 5Ah sealed lead acid battery",
      "75mm laser reflector — 1500m beam",
      "12 SMD LED side light",
      "Double switch for independent control",
      "Economical running cost",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 5Ah",
      reflector: "75mm Laser",
      beamDistance: "1500m",
      sideLight: "12 SMD LED",
      switchType: "Double Switch",
      body: "Heavy Duty",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹750", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹580", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹480", locked: true },
    ],
    image: "/product-images/efdf10ce-60c0-483c-8cba-31168e514c54.png",
  },
  {
    id: 5,
    slug: "curve-model-kb-55",
    name: "Curve – Model KB-55",
    tagline: "5000 mAh | Laser LED | Long Range",
    description:
      "The KAG Curve KB-55 features a distinctive curved ergonomic body that balances perfectly in hand. Equipped with a laser LED and lithium-ion power, it delivers impressive long-range illumination in a modern, premium-looking package.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "Laser LED for focused long-range beam",
      "Signature curved ergonomic design",
      "Premium aesthetic for gifting",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      reflector: "Laser Reflector",
      body: "Curve Ergonomic",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,050", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹810", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹670", locked: true },
    ],
    image: "/product-images/3be40299-0ee8-43e4-b296-5302a4496ff5.png",
  },
  {
    id: 6,
    slug: "deepshikha-model-ke450",
    name: "Deepshikha – Model KE450",
    tagline: "4000 mAh | 3X Life | Reliable Performance",
    description:
      "The KAG Deepshikha KE450 is engineered for reliability. Its 3X battery life technology ensures maximum hours of bright illumination per charge. Trusted by households across Madhya Pradesh and Maharashtra for dependable everyday lighting.",
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
    tagline: "5000 mAh | High Brightness | Long Backup",
    description:
      "The KAG Jio KB-88 offers a winning combination of high brightness and long backup. A daily-reliability favourite among retail customers with sturdy body construction.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "High-brightness LED",
      "Long backup for all-night coverage",
      "Sturdy body construction",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      body: "Strong Body",
      features: "High Brightness",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
  },
  {
    id: 8,
    slug: "jio-model-kb-880",
    name: "Jio – Model KB-880",
    tagline: "4V-9Ah Lead Acid | Heavy Duty | Long Backup",
    description:
      "The KAG Jio KB-880 is the heavy-duty lead acid version of the Jio series. With a 4V 9Ah battery — one of the largest in our lead acid range — it provides exceptional backup hours for security personnel and areas with frequent power cuts.",
    highlights: [
      "4V 9Ah sealed lead acid — maximum backup",
      "Heavy-duty casing for rough use",
      "Double power output",
      "Economical and easy to service",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 9Ah",
      body: "Heavy Duty",
      features: "Double Power",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
  },
  {
    id: 9,
    slug: "star-beam-model-kb-22",
    name: "Star Beam – Model KB-22",
    tagline: "6000 mAh | Long Range | Focused Beam",
    description:
      "The KAG Star Beam KB-22 is built for distance. Its focused beam cuts through darkness for remarkable range from a 6000 mAh lithium-ion battery. A favourite among farmers and security guards who demand visibility over long distances.",
    highlights: [
      "6000 mAh lithium-ion battery",
      "Precision focused beam — maximum range",
      "Strong ABS body",
      "Ideal for farms and open-area security",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "6000 mAh",
      beamDistance: "Long Range",
      body: "Strong Body",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,100", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹850", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹700", locked: true },
    ],
    image: "/product-images/k22.png",
  },
  {
    id: 10,
    slug: "star-beam-model-kb-220",
    name: "Star Beam – Model KB-220",
    tagline: "5000 mAh | Compact Power | Focused Beam",
    description:
      "The KAG Star Beam KB-220 delivers focused beam performance in a compact, lighter package. The 5000 mAh battery provides excellent backup and the concentrated beam is ideal for targeted long-range illumination.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "Compact and lightweight design",
      "Focused precision beam",
      "Great for everyday carry",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      beamDistance: "Focused Long Range",
      body: "Compact",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹950", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹730", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹600", locked: true },
    ],
    image: "/product-images/220.png",
  },
  {
    id: 11,
    slug: "tez-model-kb-121",
    name: "Tez – Model KB-121",
    tagline: "4000 mAh | 97mm Aluminium Reflector | 1500m Range",
    description:
      "The KAG Tez KB-121 earns its name. The 97mm aluminium reflector produces an extremely focused 1500m beam, while the 12 SMD side light covers your immediate surroundings. The fast-action switch ensures instant, reliable activation every time.",
    highlights: [
      "4000 mAh lithium-ion battery",
      "97mm precision aluminium reflector",
      "1500m beam distance",
      "12 SMD LED side light",
      "Fast-action switch mechanism",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "4000 mAh",
      reflector: "97mm Aluminium",
      beamDistance: "1500m",
      sideLight: "12 SMD LED",
      switchType: "Fast Action",
      body: "Strong Body",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹850", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹650", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹540", locked: true },
    ],
    image: "/product-images/d78c23f6-3f15-4593-96ec-ef729be4d229.png",
  },
  {
    id: 12,
    slug: "tez-model-kb-120",
    name: "Tez – Model KB-120",
    tagline: "4V-3Ah Lead Acid | Economical | Strong Beam",
    description:
      "The KAG Tez KB-120 is the economical lead acid version of the Tez series. Strong, reliable beam at a price point that makes it accessible to cost-conscious retailers and their customers.",
    highlights: [
      "4V 3Ah sealed lead acid battery",
      "Strong concentrated beam",
      "Economical price — high volume sales",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 3Ah",
      body: "Standard",
      features: "Strong Beam",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹650", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹500", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹415", locked: true },
    ],
    image: "/product-images/abbb458f-cafa-4637-aa51-5895a0acae51.png",
  },
  {
    id: 13,
    slug: "commando-model-kb-44",
    name: "Commando – Model KB-44",
    tagline: "6000 mAh | Tactical Design | High Performance",
    description:
      "The KAG Commando KB-44 is built for the toughest conditions. Its tactical shockproof body withstands drops, dust, and moisture while the 6000 mAh battery powers a high-performance beam for security and outdoor use.",
    highlights: [
      "6000 mAh lithium-ion battery",
      "Tactical shockproof ABS body",
      "High-performance LED beam",
      "Excellent for corporate gifting",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "6000 mAh",
      body: "Tactical Shockproof ABS",
      features: "High Performance LED",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹1,200", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹920", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹760", locked: true },
    ],
    image: "/product-images/63b2c61a-8d5e-4629-8eeb-9cc60a0455ad.png",
  },
  {
    id: 14,
    slug: "nano-gold-model-kb-11",
    name: "Nano Gold – Model KB-11",
    tagline: "5000 mAh | 55mm Laser Reflector | 3X Life",
    description:
      "The KAG Nano Gold KB-11 packs impressive range into a small form factor. The 55mm laser reflector delivers a tight long-range beam, while 3X battery life technology ensures your torch lasts through the night.",
    highlights: [
      "5000 mAh lithium-ion battery",
      "55mm laser reflector — long-range focused beam",
      "3X battery life vs. standard torches",
      "Lightweight ABS body for easy carry",
    ],
    category: "lithium-ion",
    specs: {
      batteryType: "Lithium-Ion",
      batteryCapacity: "5000 mAh",
      reflector: "55mm Laser",
      beamDistance: "Long Range",
      body: "ABS",
      features: "3X Battery Life",
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
    tagline: "4V-4.5Ah Lead Acid | Classic Design | Reliable",
    description:
      "The KAG Nano Classic KB-110 is a time-tested, reliable lead acid torch in the classic PP body design trusted by generations of customers. Simple, dependable, and cost-effective for rural and semi-urban markets.",
    highlights: [
      "4V 4.5Ah sealed lead acid battery",
      "Classic PP body — proven design",
      "Reliable and easy to service",
      "Excellent value for rural markets",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 4.5Ah",
      body: "Classic PP",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹700", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹540", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹445", locked: true },
    ],
    image: "/product-images/97210700-73d9-42bd-a663-ba7f999a096e.png",
  },
  {
    id: 16,
    slug: "lockdown-model-kb-130",
    name: "Lockdown – Model KB-130",
    tagline: "4V-3Ah Lead Acid | Security Torch | Long Beam",
    description:
      "The KAG Lockdown KB-130 is purpose-built for security applications. The solid grip body provides confident handling while the long-beam performance ensures visibility over large premises.",
    highlights: [
      "4V 3Ah sealed lead acid battery",
      "Long-beam performance for premises coverage",
      "Solid grip body — confident handling",
      "Durable for daily security use",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 3Ah",
      beamDistance: "Long Beam",
      body: "Solid Grip",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹650", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹500", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹415", locked: true },
    ],
    image: "/product-images/da0dc403-f103-4957-8774-32bec4ca6213.png",
  },
  {
    id: 17,
    slug: "mini-hungama-model-kb-140",
    name: "Mini Hungama – Model KB-140",
    tagline: "4V-3Ah Lead Acid | Compact | High Beam",
    description:
      "The KAG Mini Hungama KB-140 delivers big performance in a compact, easy-carry form factor. The lead acid battery keeps cost low while the high-intensity beam punches above its class — a high-volume retail favourite.",
    highlights: [
      "4V 3Ah sealed lead acid battery",
      "Compact body — easy to carry and store",
      "High-intensity beam for its size",
      "Budget-friendly price point",
    ],
    category: "lead-acid",
    specs: {
      batteryType: "Lead Acid",
      batteryCapacity: "4V 3Ah",
      body: "Compact",
      features: "High Beam, Easy Carry",
    },
    pricingTiers: [
      { label: "Retail MRP", moq: "1 unit+", price: "₹600", locked: false },
      { label: "Dealer Price", moq: "10+ units", price: "₹460", locked: true },
      { label: "Distributor Price", moq: "50+ units", price: "₹380", locked: true },
    ],
    image: "/product-images/6483f3d0-fee8-4aa0-a200-310f3b43e68a.png",
  },
];
