const items = [
  {
    name: "Standard Laser",
    features: [
      {
        text: "Mining Speed +1",
      },
    ],
    image: "items/harvester/standard-laser.png",
  },
  {
    name: "Inferno Laser",
    features: [
      {
        text: "Mining Speed +2",
      },
      {
        text: "Avanthium +5%",
      },
    ],
    image: "items/harvester/inferno-laser.png",
  },
  {
    name: "Ion Laser",
    features: [
      {
        text: "Mining Speed +4",
      },
      {
        text: "Liavine +5%",
      },
    ],
    image: "items/harvester/ion-laser.png",
  },
  {
    name: "Dual Laser",
    features: [
      {
        text: "Mining Speed +6",
      },
      {
        text: "Vohphos +5%",
      },
    ],
    image: "items/harvester/dual-laser.png",
  },
  {
    name: "Tumble Laser",
    features: [
      {
        text: "Mining Speed +8",
      },
      {
        text: "Sangunalt +5%",
      },
    ],
    image: "items/harvester/tumble-laser.png",
  },
  {
    name: "Avanthium",
    features: [],
    image: "items/resource/avanthium.png",
  },
  {
    name: "Bulrium",
    features: [],
    image: "items/resource/bulrium.png",
  },
  {
    name: "Caelyrium",
    features: [],
    image: "items/resource/caelyrium.png",
  },
  {
    name: "Liavine",
    features: [],
    image: "items/resource/liavine.png",
  },
  {
    name: "Murissine",
    features: [],
    image: "items/resource/murissine.png",
  },
  {
    name: "Mythine",
    features: [],
    image: "items/resource/mythine.png",
  },
  {
    name: "Orythium",
    features: [],
    image: "items/resource/orythium.png",
  },
  {
    name: "Phytemicium",
    features: [],
    image: "items/resource/phytemicium.png",
  },
  {
    name: "Sangunalt",
    features: [],
    image: "items/resource/sangunalt.png",
  },
  {
    name: "Tausmium",
    features: [],
    image: "items/resource/tausmium.png",
  },
  {
    name: "Vohphos",
    features: [],
    image: "items/resource/vohphos.png",
  },
  {
    name: "Standard Shielding",
    features: [
      {
        text: "Raid Loss Protection +1%",
      },
    ],
    image: "items/harvester/standard-shielding.png",
  },
  {
    name: "Orythium Shielding",
    features: [
      {
        text: "Raid Loss Protection +3%",
      },
    ],
    image: "items/harvester/orythium-shielding.png",
  },
  {
    name: "Phytemicium Shielding",
    features: [
      {
        text: "Raid Loss Protection +5%",
      },
    ],
    image: "items/harvester/phytemicium-shielding.png",
  },
  {
    name: "Mythine Shielding",
    features: [
      {
        text: "Raid Loss Protection +7%",
      },
    ],
    image: "items/harvester/mythine-shielding.png",
  },
  {
    name: "Standard Turret",
    features: [
      {
        text: "Raid Chance Protection +1%",
      },
    ],
    image: "items/harvester/standard-turret.png",
  },
];

const getFeatures = function (name: string) {
  const item = items.find((b) => b.name.toLowerCase() === name.toLowerCase());
  if (item) return item.features;
};

const getImage = function (name: string) {
  const item = items.find((b) => b.name.toLowerCase() === name.toLowerCase());
  if (item) return item.image;
  return "logo.png";
};

export default {
  getFeatures,
  getImage,
};
