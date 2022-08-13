import * as resourceData from "@/utilities/game-library/resources";

const PLANET_NAMES = [
  "Aethea",
  "Amaut",
  "Draecarra",
  "Eutania",
  "Luthien",
  "Necyke",
  "Psigen",
  "Tsuma",
];

const AETHEA = {
  Name: "Aethea",
  Description:
    "Multiple distinct seasons with notable temperature diftiple distinct seasons with notable temperature diftiple distinct seasons with notable temperature diftiple distinct seasons with notable temperature differences during the year.",
  Type: "Terrestrial",
  Mass: "5.243 × 10^24",
  Diameter: "11,965",
  Image: "aethea.png",
  Resources: [
    resourceData.Resources.Murissine,
    resourceData.Resources.Orythium,
    resourceData.Resources.Phytemicium,
    resourceData.Resources.Tausmium,
  ],
};

const AMAUT = {
  Name: "Amaut",
  Description:
    "Multiple distinct seasons with notable temperature differences during the year.",
  Type: "Terrestrial",
  Mass: "10.618 × 10^24",
  Diameter: "11,508",
  Image: "amaut.png",
  Resources: [
    resourceData.Resources.Liavine,
    resourceData.Resources.Murissine,
    resourceData.Resources.Tausmium,
  ],
};

const DRAECARRA = {
  Name: "Draecarra",
  Description: "Lol",
  Type: "Terrestrial",
  Mass: "9.31 x 10^24",
  Diameter: "10,814",
  Image: "draecarra.png",
  Resources: [
    resourceData.Resources.Murissine,
    resourceData.Resources.Sangunalt,
  ],
};

const EUTANIA = {
  Name: "Eutania",
  Description: "Lol",
  Type: "Terrestrial",
  Mass: "1.985 × 10^24",
  Diameter: "14,126",
  Image: "eutania.png",
  Resources: [
    resourceData.Resources.Avanthium,
    resourceData.Resources.Murissine,
    resourceData.Resources.Phytemicium,
    resourceData.Resources.Tausmium,
  ],
};

const NECYKE = {
  Name: "Necyke",
  Description: "Lol",
  Type: "Terrestrial",
  Mass: "10.027 × 10^24",
  Diameter: "16,496",
  Image: "necyke.png",
  Resources: [
    resourceData.Resources.Avanthium,
    resourceData.Resources.Caelyrium,
    resourceData.Resources.Liavine,
  ],
};

const LUTHIEN = {
  Name: "Luthien",
  Description: "Lol",
  Type: "Gas Giant",
  Mass: "1,110.071 × 10^24",
  Diameter: "142,733",
  Image: "luthien.png",
  Resources: [resourceData.Resources.Vohphos],
};

const M4V = {
  Name: "M4V",
  Description: "The main star of the system.",
  Type: "Star",
  Mass: "2.13 x 10^30",
  Diameter: "758,000",
  Image: "m4v.png",
  Resources: [],
};

const PSIGEN = {
  Name: "Psigen",
  Description: "Lol",
  Type: "Gas Giant",
  Mass: "1,376.184 × 10^24",
  Diameter: "106,557",
  Image: "psigen.png",
  Resources: [resourceData.Resources.Bulrium],
};

const TSUMA = {
  Name: "Tsuma",
  Description: "Lol",
  Type: "Ice Giant",
  Mass: "0.366 × 10^24",
  Diameter: "5,538",
  Image: "tsuma.png",
  Resources: [
    resourceData.Resources.Avanthium,
    resourceData.Resources.Caelyrium,
    resourceData.Resources.Mythine,
  ],
};

export const getPlanetData = (name) => {
  switch (name ? name.toLowerCase() : "") {
    case AETHEA.Name.toLowerCase():
      return AETHEA;
    case AMAUT.Name.toLowerCase():
      return AMAUT;
    case DRAECARRA.Name.toLowerCase():
      return DRAECARRA;
    case EUTANIA.Name.toLowerCase():
      return EUTANIA;
    case LUTHIEN.Name.toLowerCase():
      return LUTHIEN;
    case M4V.Name.toLowerCase():
      return M4V;
    case NECYKE.Name.toLowerCase():
      return NECYKE;
    case PSIGEN.Name.toLowerCase():
      return PSIGEN;
    case TSUMA.Name.toLowerCase():
      return TSUMA;
    default:
      return {};
  }
};

export const Planets = Object.freeze({
  PlanetNames: PLANET_NAMES,
  Aethea: AETHEA,
  Amaut: AMAUT,
  Draecarra: DRAECARRA,
  Eutania: EUTANIA,
  Luthien: LUTHIEN,
  M4V: M4V,
  Necyke: NECYKE,
  Psigen: PSIGEN,
  Tsuma: TSUMA,
});
