import { HubConnectionBuilder } from "@microsoft/signalr";
import router from "@/router";
import routes from "@/utilities/api/socket/routes";
// Stores
import { useAccountStore } from "@/stores/accountStore";
import { useHarvesterStore } from "@/stores/harvesterStore";
import { useMissionStore } from "@/stores/missionStore";
import { useInventoryStore } from "@/stores/inventoryStore";
import { useWalletStore } from "@/stores/walletStore";

// Toast
import { createToast } from "mosha-vue-toastify";
// import the styling for the toast
import "mosha-vue-toastify/dist/style.css";

const popToast = function (isSuccess: boolean, message: string) {
  createToast(
    { title: message, description: "" },
    {
      type: isSuccess ? "success" : "warning",
      position: "bottom-right",
      hideProgressBar: true,
      showIcon: true,
      timeout: 5000,
    }
  );
};

// API Version
const VERSION = "V1";

// Socket
/*
const socket = new HubConnectionBuilder()
  .withUrl("https://localhost:7102/gamehub", {
    accessTokenFactory: () => useAccountStore().getToken,
  })
  .build();
*/

// Azure socket (use when deployed)

const socket = new HubConnectionBuilder()
  .withUrl("https://eutania.azurewebsites.net/gamehub", {
    accessTokenFactory: () => useAccountStore().getToken,
  })
  .build();

// On close
socket.onclose(async () => {
  const accountStore = useAccountStore();
  accountStore.setIsLoggedIn(false);
  accountStore.setToken("");
  accountStore.setEmail("");
  await router.push("/login");
});

// After successful login through regular api, connect() is automatically
// fired to add the user to a hub group on the server
const connect = async function () {
  if (socket.state === "Disconnected") await socket.start();
  await socket.invoke(routes.account.login);
};
socket.on("login", async (loadObject) => {
  const accountStore = useAccountStore();
  accountStore.setUsername(loadObject.username);
  await router.push({ name: "bridge" });
});

const getInventory = async function () {
  await socket.invoke(VERSION, "inventory", routes.inventory.get, null);
};
socket.on("getInventory", (response) => {
  console.log(response);
  const inventoryStore = useInventoryStore();
  inventoryStore.setInventory(response.data);
});

const getHarvester = async function () {
  await socket.invoke(VERSION, "harvester", routes.harvester.get, null);
};
socket.on("getHarvester", async (response) => {
  if (response.success) {
    const harvesterStore = useHarvesterStore();
    harvesterStore.setHarvester(response.data);
  }
});

const setHarvesterSector = async function (sectorName: string) {
  const request = JSON.stringify({
    SectorName: sectorName,
  });
  await socket.invoke(
    VERSION,
    "harvester",
    routes.harvester.setSector,
    request
  );
};
socket.on("setHarvesterSector", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await router.push({ name: "harvester.connect" });
  }
});

const mine = async function () {
  await socket.invoke(VERSION, "harvester", routes.harvester.mine, null);
};
socket.on("mine", async (response) => {
  popToast(response.success, response.message);
  console.log(response.data);
  if (response.success) {
    const harvesterStore = useHarvesterStore();
    harvesterStore.setOnCooldown(response.data.onCooldown);
    harvesterStore.setCooldown(response.data.cooldown);
    harvesterStore.setMiningRewards(response.data);
    await router.push({ name: "harvester.claim" });
  }
});

const equipHarvesterItem = async function (itemName: string) {
  const request = JSON.stringify({
    ItemName: itemName,
  });
  await socket.invoke(
    VERSION,
    "harvester",
    routes.harvester.equipItem,
    request
  );
};
socket.on("equipItem", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await router.push({ name: "harvester.connect" });
  }
});

const getResourceMissions = async function () {
  await socket.invoke(
    VERSION,
    "mission",
    routes.mission.getResourceMissions,
    null
  );
};
socket.on("getResourceMissions", async (response) => {
  if (response.success) {
    const missionStore = useMissionStore();
    missionStore.setResourceMissions(response.data.missions);
  }
});

const completeResourceMission = async function (missionCode: string) {
  const request = JSON.stringify({
    MissionCode: missionCode,
  });
  await socket.invoke(
    VERSION,
    "mission",
    routes.mission.completeResourceMission,
    request
  );
};
socket.on("completeResourceMission", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await getResourceMissions();
    await getInventory();
    await getWallet();
  } else {
    await getResourceMissions();
  }
});

const getWallet = async function () {
  await socket.invoke(VERSION, "wallet", routes.wallet.get, null);
};
socket.on("getWallet", (response) => {
  const walletStore = useWalletStore();
  walletStore.setWallet(response.data);
});

const buyListing = async function (listingId: number) {
  const request = JSON.stringify({
    ListingId: listingId,
  });
  await socket.invoke(VERSION, "market", routes.market.buyListing, request);
};
socket.on("buyListing", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await getWallet();

    await router.push({ name: "market.browse.eutania" });
  } else {
    //toast.error("Error buying listing.");
  }
});
const sellListing = async function (
  itemName: string,
  quantity: number,
  price: number
) {
  const request = JSON.stringify({
    ItemName: itemName,
    Quantity: quantity,
    Price: price,
  });
  await socket.invoke(VERSION, "market", routes.market.sellListing, request);
};
socket.on("sellListing", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await getWallet();
    await router.push({ name: "market.browse.eutania" });
  } else {
    //toast.error("Error buying resources.");
  }
});

const buySector = async function (sectorName: string) {
  const request = JSON.stringify({
    SectorName: sectorName,
  });
  await socket.invoke(VERSION, "market", routes.market.buySector, request);
};
socket.on("buySector", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await router.push({ name: "market.browse.eutania" });
  }
});

const sellSector = async function (sectorName: string, price: number) {
  const request = JSON.stringify({
    SectorName: sectorName,
    Price: price,
  });
  await socket.invoke(VERSION, "market", routes.market.sellSector, request);
};
socket.on("sellSector", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    await router.push({ name: "market.browse.eutania" });
  }
});

const changeCommissionRate = async function (sectorName: string, rate: number) {
  const request = JSON.stringify({
    SectorName: sectorName,
    Rate: rate * 1.0,
  });
  await socket.invoke(
    VERSION,
    "sector",
    routes.sector.changeCommissionRate,
    request
  );
};
socket.on("changeCommissionRate", async (response) => {
  popToast(response.success, response.message);
  if (response.success) {
    //toast.success(response.message);
    console.log("good");
    await getInventory();
  } else {
    console.log("bad");
    //toast.error(response.message);
  }
});
socket.on("serverNotify", async (response) => {
  popToast(response.success, response.message);
});

export default {
  // General
  connect,
  // Inventory
  getInventory,
  // Harvester
  getHarvester,
  setHarvesterSector,
  mine,
  equipHarvesterItem,
  // Missions
  getResourceMissions,
  completeResourceMission,
  // Wallet
  getWallet,
  // Market
  buyListing,
  sellListing,
  buySector,
  sellSector,
  // Sector
  changeCommissionRate,
};
