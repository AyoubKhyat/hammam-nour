export interface Treatment {
  id: string;
  nameFr: string;
  nameAr: string;
  duration: string;
  price: number;
  category: Category;
  description: string;
  ingredients: string[];
}

export type Category = "hammam" | "massage" | "facial" | "body-wrap";

export const categoryLabels: Record<Category, string> = {
  hammam: "Hammam Rituals",
  massage: "Massages",
  facial: "Facials",
  "body-wrap": "Body Wraps",
};

export const treatments: Treatment[] = [
  {
    id: "hammam-complet",
    nameFr: "Rituel Hammam Complet",
    nameAr: "الحمام المغربي الكامل",
    duration: "90min",
    price: 650,
    category: "hammam",
    description:
      "A sacred journey through steam, black soap, and kessa glove exfoliation. Emerge reborn, skin glowing like polished amber.",
    ingredients: ["Black soap", "Kessa glove", "Eucalyptus steam"],
  },
  {
    id: "hammam-royal",
    nameFr: "Hammam Royal au Lait",
    nameAr: "الحمام الملكي بالحليب",
    duration: "120min",
    price: 950,
    category: "hammam",
    description:
      "The queen's ritual — warm milk and honey drape your skin after a deep hammam cleanse. Pure indulgence, ancient luxury.",
    ingredients: ["Milk", "Honey", "Black soap", "Rose petals"],
  },
  {
    id: "hammam-express",
    nameFr: "Hammam Express",
    nameAr: "حمام سريع",
    duration: "45min",
    price: 350,
    category: "hammam",
    description:
      "The essence of hammam distilled — a swift purification for those who seek renewal between the hours.",
    ingredients: ["Black soap", "Kessa glove"],
  },
  {
    id: "hammam-argan",
    nameFr: "Rituel Hammam à l'Argan",
    nameAr: "حمام بزيت الأركان",
    duration: "90min",
    price: 750,
    category: "hammam",
    description:
      "Liquid gold meets ancient steam. Argan oil infuses every pore after a thorough hammam scrub, leaving skin impossibly soft.",
    ingredients: ["Black soap", "Argan oil", "Kessa glove", "Eucalyptus"],
  },
  {
    id: "massage-argan",
    nameFr: "Massage à l'Huile d'Argan",
    nameAr: "تدليك بزيت الأركان",
    duration: "60min",
    price: 550,
    category: "massage",
    description:
      "Warm argan oil worked deep into tired muscles. The scent of Morocco's orchards fills the air as tension dissolves.",
    ingredients: ["Pure argan oil", "Essential oils"],
  },
  {
    id: "massage-hot-stone",
    nameFr: "Massage aux Pierres Chaudes",
    nameAr: "تدليك بالأحجار الساخنة",
    duration: "90min",
    price: 750,
    category: "massage",
    description:
      "Heated basalt stones trace your meridians, melting knots and drawing warmth deep into the body's architecture.",
    ingredients: ["Basalt stones", "Argan oil", "Lavender"],
  },
  {
    id: "massage-relaxant",
    nameFr: "Massage Relaxant Profond",
    nameAr: "تدليك استرخائي عميق",
    duration: "60min",
    price: 500,
    category: "massage",
    description:
      "Slow, deliberate strokes dissolve the weight of the world. A deep-tissue meditation performed by master hands.",
    ingredients: ["Almond oil", "Chamomile", "Lavender"],
  },
  {
    id: "massage-quatre-mains",
    nameFr: "Massage à Quatre Mains",
    nameAr: "تدليك بأربع أيدي",
    duration: "60min",
    price: 900,
    category: "massage",
    description:
      "Two therapists move in perfect synchrony — four hands, one rhythm. The mind surrenders completely.",
    ingredients: ["Argan oil", "Rose essential oil"],
  },
  {
    id: "facial-rose",
    nameFr: "Soin Visage à l'Eau de Rose",
    nameAr: "علاج الوجه بماء الورد",
    duration: "45min",
    price: 450,
    category: "facial",
    description:
      "Damask rose water from the Valley of Roses quenches thirsty skin. A petal-soft restoration of radiance.",
    ingredients: ["Rose water", "Rose hip oil", "Ghassoul clay"],
  },
  {
    id: "facial-argan",
    nameFr: "Soin Éclat à l'Argan",
    nameAr: "علاج الإشراق بالأركان",
    duration: "60min",
    price: 550,
    category: "facial",
    description:
      "Argan oil and orange blossom unite in a luminous facial that restores the glow of sun-kissed mornings.",
    ingredients: ["Argan oil", "Orange blossom", "Vitamin E"],
  },
  {
    id: "facial-ghassoul",
    nameFr: "Masque Purifiant au Ghassoul",
    nameAr: "قناع الغسول المنقي",
    duration: "45min",
    price: 400,
    category: "facial",
    description:
      "Atlas Mountain clay draws out impurities with ancient wisdom. Your skin breathes clean, clear, renewed.",
    ingredients: ["Ghassoul clay", "Rose water", "Lavender"],
  },
  {
    id: "wrap-ghassoul",
    nameFr: "Enveloppement au Ghassoul",
    nameAr: "لفافة الغسول",
    duration: "60min",
    price: 550,
    category: "body-wrap",
    description:
      "A full-body cocoon of mineral-rich Atlas clay. Detoxifying, remineralizing, deeply quieting.",
    ingredients: ["Ghassoul clay", "Eucalyptus", "Rose water"],
  },
  {
    id: "wrap-roses",
    nameFr: "Enveloppement aux Pétales de Rose",
    nameAr: "لفافة بتلات الورد",
    duration: "60min",
    price: 600,
    category: "body-wrap",
    description:
      "Crushed rose petals and shea butter form a fragrant mantle over your body. Softness becomes a state of being.",
    ingredients: ["Rose petals", "Shea butter", "Rose water"],
  },
  {
    id: "wrap-chocolat",
    nameFr: "Enveloppement au Chocolat & Argan",
    nameAr: "لفافة الشوكولاتة والأركان",
    duration: "90min",
    price: 700,
    category: "body-wrap",
    description:
      "Dark chocolate and argan oil — an antioxidant embrace that nourishes body and spirit in equal measure.",
    ingredients: ["Raw chocolate", "Argan oil", "Coconut milk"],
  },
  {
    id: "wrap-henne",
    nameFr: "Rituel au Henné Naturel",
    nameAr: "طقوس الحناء الطبيعية",
    duration: "90min",
    price: 650,
    category: "body-wrap",
    description:
      "Ancient henna art meets therapeutic body wrapping. Natural henna strengthens and conditions while adorning the skin.",
    ingredients: ["Natural henna", "Lemon", "Eucalyptus oil", "Sugar"],
  },
];
