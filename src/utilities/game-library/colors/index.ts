const getRarityColor = function (rarity: string) {
  switch (rarity.toLowerCase()) {
    case "common":
      return "#8d99ae";
    case "uncommon":
      return "#80b918";
    case "rare":
      return "#9d4edd";
    case "mythic":
      return "#eeef20";
    default:
      return "#8d99ae";
  }
};

export default {
  getRarityColor,
};
