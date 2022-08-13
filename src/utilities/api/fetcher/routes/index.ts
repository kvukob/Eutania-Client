const account = {
  login: "account/login",
  create: "account/create",
  changeEmail: "account/change-email",
  changePassword: "account/change-password",
  accountRecovery: "account/account-recovery",
};

const sector = {
  get: "sector/name",
};

const market = {
  getByListingId: "market/listing",
  getListingsByType: "market/type",
  getListingsByName: "market/name",
  getSectors: "market/sectors",
  getSectorsCount: "market/count",
};

export default {
  account,
  sector,
  market,
};
