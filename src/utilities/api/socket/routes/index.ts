const account = {
  login: "login",
};
const inventory = {
  get: "getInventory",
};
const harvester = {
  get: "getHarvester",
  setSector: "setHarvesterSector",
  mine: "mine",
  equipItem: "equipItem",
};
const mission = {
  getResourceMissions: "getResourceMissions",
  completeResourceMission: "completeResourceMission",
};
const wallet = {
  get: "getWallet",
};
const market = {
  buyListing: "buyListing",
  sellListing: "sellListing",
  buySector: "buySector",
  sellSector: "sellSector",
};
const sector = {
  changeCommissionRate: "changeCommissionRate",
};
export default {
  account,
  inventory,
  harvester,
  mission,
  wallet,
  market,
  sector,
};
