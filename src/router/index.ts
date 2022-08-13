import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/public/HomeView.vue";
import BridgeView from "../views/private/BridgeView.vue";
import CargoView from "../views/private/CargoView.vue";
import HarvesterView from "../views/private/harvester/HarvesterView.vue";
import MissionsView from "../views/private/MissionsView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/public/AuthView.vue"),
  },
  {
    path: "/verify-email/:code?",
    name: "verify.email",
    component: () => import("../views/public/VerifyEmailView.vue"),
  },
  {
    path: "/account-recovery/:code?",
    name: "account.recovery",
    component: () => import("../views/public/AccountRecoveryView.vue"),
  },
  {
    path: "/game",
    component: () => import("../views/private/GameView.vue"),
    children: [
      {
        path: "bridge",
        name: "bridge",
        component: BridgeView,
      },

      {
        path: "harvester",
        component: HarvesterView,
        children: [
          {
            path: "connect",
            name: "harvester.connect",
            component: () =>
              import("../views/private/harvester/HarvesterConnectingView.vue"),
          },
          {
            path: "maintenance",
            name: "harvester.maintenance",
            component: () =>
              import("../views/private/harvester/HarvesterMaintenanceView.vue"),
          },
          {
            path: "online",
            name: "harvester.online",
            component: () =>
              import("../views/private/harvester/HarvesterOnlineView.vue"),
          },
          {
            path: "sector",
            name: "harvester.sector",
            component: () =>
              import("../views/private/harvester/HarvesterSectorView.vue"),
          },
          {
            path: "claim",
            name: "harvester.claim",
            component: () =>
              import("../views/private/harvester/HarvesterClaimView.vue"),
          },
        ],
      },
      {
        path: "cargo",
        name: "cargo",
        component: CargoView,
      },
      {
        path: "sector",
        name: "sector",
        component: () => import("../views/private/sector/SectorView.vue"),
        children: [
          {
            path: ":name",
            name: "sector.details",
            component: () =>
              import("../views/private/sector/SectorDetailView.vue"),
          },
        ],
      },
      {
        path: "missions",
        name: "missions",
        component: MissionsView,
      },
      {
        path: "market",
        component: () => import("../views/private/market/MarketView.vue"),
        children: [
          {
            path: "sell",
            name: "market.sell",
            component: () =>
              import("../views/private/market/sell/MarketSellView.vue"),
            children: [
              {
                path: "item",
                name: "market.sell.item",
                component: () =>
                  import("../views/private/market/sell/MarketSellItemView.vue"),
              },
              {
                path: "sector",
                name: "market.sell.sector",
                component: () =>
                  import(
                    "../views/private/market/sell/MarketSellSectorView.vue"
                  ),
              },
            ],
          },
          {
            path: "browse",
            component: () =>
              import("../views/private/market/buy/MarketBrowseView.vue"),
            children: [
              {
                path: "eutania",
                name: "market.browse.eutania",
                component: () =>
                  import("../views/private/market/buy/MarketEutaniaView.vue"),
              },
              {
                path: ":id",
                name: "market.order",
                component: () => import("../core/market/MarketOrder.vue"),
              },
              {
                path: "sectors",
                name: "market.browse.sectors",
                component: () =>
                  import("../views/private/market/buy/MarketSectorsView.vue"),
              },
              {
                path: "sectors/:name",
                name: "market.sector.order",
                component: () => import("../core/market/MarketSectorOrder.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("../views/private/SettingsView.vue"),
      },
    ],
  },
];

// nav guard needs auth token AND email to be verified
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
