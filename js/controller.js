import * as Model from "./models/model.js";
import View from "./views/View.js";
import AddOnsView from "./views/addOnsView.js";
import FormNavigationBtns from "./views/formNavigationBtns.js";
import RadioBtnsView from "./views/radioBtnsView.js";

export const sendUserInputData = function () {
  return Model.userInputData;
};

export const resetAddOnModelData = function () {
  Model.userInputData.service = "";
  Model.userInputData.storage = "";
  Model.userInputData.profile = "";
};

export const sendFormInfoToModel = function (section, ...data) {
  // Spread operator
  switch (section) {
    case "section-1":
      Model.userInputData.name = data[0];
      Model.userInputData.email = data[1];
      Model.userInputData.phone = data[2];
      break;
    case "section-2":
      Model.userInputData.planSelected = data[0];
      Model.userInputData.planPrice = data[1];
      break;
    case "section-3":
      data.forEach((checkbox) => {
        const checkBoxPrice = document.querySelector(
          `.${checkbox}`
        ).textContent;
        Model.userInputData[checkbox] = checkBoxPrice;
      });
      // Generate UI text from model info to load Finishing-up page
      FormNavigationBtns.displayFinishingUpInfoToUI(
        Model.userInputData,
        Model.userInputData.toggleSwitch
      );
      break;
  }
};

export const receiveToggleSwitchState = function (toggleState) {
  Model.updateToggleSwitchState(toggleState);
};

export const currToggleSwitchState = function () {
  return Model.updateCurrentPage.toggleSwitchState;
};

export const currentPage = function () {
  return Model.getCurrentPage();
};

export const updateCurrPage = function (updatePagination) {
  Model.updateCurrentPage(updatePagination);
};

// RadioBtnsView.radioBtnsFalse();
const init = function () {
  RadioBtnsView.radioBtnEventListeners();
  RadioBtnsView._generateDefaultPrices(Model.monthlyPlanPrices);
  RadioBtnsView.toggleSwitchState(
    Model.monthlyPlanPrices,
    Model.yearlyPlanPrices
  );
  RadioBtnsView.initRadioBtnChecked();
  AddOnsView.addOnBtnsEventListeners();
  FormNavigationBtns.nextFormStep();
  FormNavigationBtns.generateFormBtnsText();
  FormNavigationBtns.goToPreviousFormStep();
  window.addEventListener("resize", () => {
    FormNavigationBtns.removeBreak();
  });
  FormNavigationBtns.removeBreak();
};

init();
