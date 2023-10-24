import * as Controller from "../controller.js";
import View from "./View.js";

class RadioBtnsView extends View {
  radioBtns = document.querySelectorAll(".plans");
  radioButtons = document.querySelectorAll('input[type="radio"][name="plan"]');
  // Get the toggle switch element
  toggleSwitch = document.getElementById("toggle-switch");
  yearlyPlans = document.querySelectorAll(".plan-months");

  radioBtnEventListeners = function () {
    this.radioBtns.forEach((btn) => {
      btn.addEventListener("click", this.radioBtnChecked.bind(this));
    }, this);
  };

  generateColorReset = function () {
    this.radioBtns.forEach((btn) => {
      btn.style.backgroundColor = "hsl(0, 0%, 100%)";
      btn.style.borderColor = "hsl(229, 24%, 87%)";
    });
  };

  radioBtnsUnchecked = function () {
    this.radioButtons.forEach((radioBtns) => {
      radioBtns.checked = false;
    });
  };

  radioBtnChecked = function (e) {
    // 1. Unchecks all btns
    this.radioBtnsUnchecked();
    // 2. Targets closest plan Div which has a unique class name to differentiate from other btns
    const radioBtnSection = e.target.closest('div[class*="plans"]');
    // 3. Targets specific btn class & saves its name to match to btn ID
    const radioBtnSelected = radioBtnSection.classList[0];
    // 4. Uses btn class to target the specific radio btn and make it checked
    document.getElementById(radioBtnSelected).checked = true;
    // 5. Store the selected radio button value in a variable (option for future)
    // const selectedPlan = document.getElementById(radioBtnSelected).value;
    // 5. resets all btn colors as a safeguard
    this.generateColorReset();
    // 6. Clicked btn has background and border color changed to show clicked state.
    this.generateClickedColors(radioBtnSelected);
  };

  initRadioBtnChecked() {
    const arcadePlanRadioButton = document.getElementById("arcade-plan");
    const arcadePlanContainer = document.querySelector(".arcade-plan");
    arcadePlanRadioButton.checked = true;
    arcadePlanContainer.style.backgroundColor = "hsl(228, 100%, 84%, 0.2)";
    arcadePlanContainer.style.borderColor = "hsl(243, 100%, 62%)";
  }

  monthsHidden = function () {
    this.yearlyPlans.forEach((hidden) => {
      hidden.classList.add("hidden");
    });
  };
  monthsRevealed = function () {
    this.yearlyPlans.forEach((hidden) => {
      hidden.classList.remove("hidden");
    });
  };

  toggleSwitchState = function (monthlyPrices, yearlyPrices) {
    this.toggleSwitch.addEventListener(
      "click",
      function () {
        this.toggleSwitch.checked = this.toggleSwitch.checked;
        this.toggleSwitch.checked ? this.monthsRevealed() : this.monthsHidden();
        this._clearText();
        // When click event happens View Updates Prices
        this.toggleSwitch.checked
          ? this._generateYearlyPrices(yearlyPrices)
          : this._generateMonthlyPrices(monthlyPrices);
        Controller.receiveToggleSwitchState(this.toggleSwitch.checked);
      }.bind(this)
    );
  };
}

export default new RadioBtnsView();
