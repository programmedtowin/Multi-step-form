export const monthlyPlanPrices = {
  arcade: "$9/mo",
  advanced: "$12/mo",
  pro: "$15/mo",
  service: "+$1/mo",
  storage: "+$2/mo",
  profile: "+$2/mo",
};

export const yearlyPlanPrices = {
  arcade: "$90/yr",
  advanced: "$120/yr",
  pro: "$150/yr",
  service: "+$10/yr",
  storage: "+$20/yr",
  profile: "+$20/yr",
};

export const userInputData = {
  // Section-1
  name: "",
  email: "",
  phone: "",
  // Section-2
  planSelected: "",
  planPrice: "",
  toggleSwitch: "",
  // Section-3
  service: "",
  storage: "",
  profile: "",
};

export let currentPage = 1;

export const getCurrentPage = function () {
  return currentPage;
};

export const updateCurrentPage = function (updatePagination) {
  updatePagination === "forward" ? (currentPage += 1) : (currentPage -= 1);
};

export const updateToggleSwitchState = function (toggleState) {
  userInputData.toggleSwitch = toggleState;
};
