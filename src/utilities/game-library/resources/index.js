const RESOURCE_NAMES = [
  "Avanthium",
  "Bulrium",
  "Caelyrium",
  "Liavine",
  "Murissine",
  "Mythine",
  "Orythium",
  "Phytemicium",
  "Sangunalt",
  "Tausmium",
  "Vohphos",
];

const AVANTHIUM = {
  Name: "Avanthium",
  Rarity: "Uncommon",
  State: "Solid",
  Image: "avanthium.png",
};

const BULRIUM = {
  Name: "Bulrium",
  Rarity: "Uncommon",
  State: "Solid",
  Image: "bulrium.png",
};

const CAELYRIUM = {
  Name: "Caelyrium",
  Rarity: "Uncommon",
  State: "Solid",
  Image: "caelyrium.png",
};

const LIAVINE = {
  Name: "Liavine",
  Rarity: "Common",
  State: "Solid",
  Image: "liavine.png",
};

const MURISSINE = {
  Name: "Murissine",
  Rarity: "Common",
  State: "Solid",
  Image: "murissine.png",
};

const MYTHINE = {
  Name: "Mythine",
  Rarity: "Rare",
  State: "Solid",
  Image: "mythine.png",
};

const ORYTHIUM = {
  Name: "Orythium",
  Rarity: "Common",
  State: "Solid",
  Image: "orythium.png",
};

const PHYTEMICIUM = {
  Name: "Phytemicium",
  Rarity: "Rare",
  State: "Solid",
  Image: "phytemicium.png",
};

const SANGUNALT = {
  Name: "Sangunalt",
  Rarity: "Rare",
  State: "Solid",
  Image: "sangunalt.png",
};

const TAUSMIUM = {
  Name: "Tausmium",
  Rarity: "Common",
  State: "Gas",
  Image: "tausmium.png",
};

const VOHPHOS = {
  Name: "Vohphos",
  Rarity: "Common",
  State: "Gas",
  Image: "vohphos.png",
};

export const getResourceData = (name) => {
  switch (name) {
    case AVANTHIUM.Name.toLowerCase():
      return AVANTHIUM;
    case BULRIUM.Name.toLowerCase():
      return BULRIUM;
    case CAELYRIUM.Name.toLowerCase():
      return CAELYRIUM;
    case LIAVINE.Name.toLowerCase():
      return LIAVINE;
    case MURISSINE.Name.toLowerCase():
      return MURISSINE;
    case MYTHINE.Name.toLowerCase():
      return MYTHINE;
    case ORYTHIUM.Name.toLowerCase():
      return ORYTHIUM;
    case PHYTEMICIUM.Name.toLowerCase():
      return PHYTEMICIUM;
    case SANGUNALT.Name.toLowerCase():
      return SANGUNALT;
    case TAUSMIUM.Name.toLowerCase():
      return TAUSMIUM;
    case VOHPHOS.Name.toLowerCase():
      return VOHPHOS;
    default:
      return {};
  }
};

export const Resources = {
  ResourceNames: RESOURCE_NAMES,
  Avanthium: AVANTHIUM,
  Bulrium: BULRIUM,
  Caelyrium: CAELYRIUM,
  Liavine: LIAVINE,
  Murissine: MURISSINE,
  Mythine: MYTHINE,
  Orythium: ORYTHIUM,
  Phytemicium: PHYTEMICIUM,
  Sangunalt: SANGUNALT,
  Tausmium: TAUSMIUM,
  Vohphos: VOHPHOS,
};
