export default class View {
  // Page 2: Select a plan
  arcadePlan = document.querySelector(".arcade-price");
  advancedPlan = document.querySelector(".advanced-price");
  proPlan = document.querySelector(".pro-price");
  // Page 3: Add-ons
  onlineServiceAddOn = document.querySelector(".service");
  largerStorageAddOn = document.querySelector(".storage");
  customizableProfileAddOn = document.querySelector(".profile");

  finishingUpContainer = document.querySelector(".form__cart");
  totalContainer = document.querySelector(".form__total-container");

  thankYouHTML = document.querySelector(".form__description--thank-you");

  // General Initial Code
  _generateDefaultPrices(prices) {
    this._generateMonthlyPrices(prices);
  }

  // Page 2: Select your plan
  _generateMonthlyPrices(prices) {
    this._generatePlanPrices(prices);
    this._generateAddOnPrices(prices);
  }

  _generateYearlyPrices(prices) {
    this._generatePlanPrices(prices);
    this._generateAddOnPrices(prices);
  }

  _generatePlanPrices(prices) {
    this.arcadePlan.insertAdjacentHTML("afterbegin", prices.arcade);
    this.advancedPlan.insertAdjacentHTML("afterbegin", prices.advanced);
    this.proPlan.insertAdjacentHTML("afterbegin", prices.pro);
  }

  _generateAddOnPrices(prices) {
    this.onlineServiceAddOn.insertAdjacentHTML("afterbegin", prices.service);
    this.largerStorageAddOn.insertAdjacentHTML("afterbegin", prices.storage);
    this.customizableProfileAddOn.insertAdjacentHTML(
      "afterbegin",
      prices.profile
    );
  }

  generateClickedColors(btn) {
    this.activeBtn = document.querySelector(`.${btn}`);
    this.activeBtn.style.backgroundColor = "hsl(228, 100%, 84%, 0.2)";
    this.activeBtn.style.borderColor = "hsl(243, 100%, 62%)";
  }

  generateColorReset(btn) {
    this.activeBtn = document.querySelector(`.${btn}`);
    this.activeBtn.style.backgroundColor = "hsl(0, 0%, 100%)";
    this.activeBtn.style.borderColor = "hsl(229, 24%, 87%)";
  }

  _clearText() {
    // Plan Section Prices
    this.arcadePlan.textContent = "";
    this.advancedPlan.textContent = "";
    this.proPlan.textContent = "";

    // Add-on Section Prices
    this.onlineServiceAddOn.textContent = "";
    this.largerStorageAddOn.textContent = "";
    this.customizableProfileAddOn.textContent = "";
  }

  collectPersonalInfo(section) {
    const name = section.querySelector("#name").value;
    const email = section.querySelector("#email").value;
    const phone = section.querySelector("#tel").value;
    return [name, email, phone];
  }

  collectPlanInfo(section) {
    // 1. Gets the value of the selectedRadioBtn
    const selectedRadioButton = document.querySelector(
      'input[type="radio"][name="plan"]:checked'
    );
    const selectedValue = selectedRadioButton.value;
    // Selects the span that contains the textContent of dynamic value
    const planPriceLabel = section.querySelector(
      `.${selectedValue.toLowerCase()}-price`
    );
    const planPrice = planPriceLabel.textContent;
    return [selectedValue, planPrice];
  }

  collectAddOnsInfo() {
    const checkBoxes = document.querySelectorAll(`input[name="checkboxes"]`);
    const checkBoxPrice = [];
    checkBoxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const words = checkbox.id.split("-");
        const price = words[words.length - 1];
        checkBoxPrice.push(price);
      }
    });
    return checkBoxPrice;
  }

  displayFinishingUpInfoToUI(data, toggleSwitch) {
    this.renderFinishingUpPlanInfo(data, toggleSwitch);
    const addons = [
      { name: "Online service", property: "service" },
      { name: "Larger storage", property: "storage" },
      { name: "Customizable profile", property: "profile" },
    ];

    // Iterate through the array and render add-ons based on conditions
    addons.forEach((addon) => {
      if (data[addon.property] !== "") {
        this.renderFinishingUpAddOns(data, addon.name, addon.property);
      }
    });
    this.renderFinishingUpTotalPrice(data, toggleSwitch);
  }

  renderFinishingUpPlanInfo(data, toggleSwitch) {
    toggleSwitch === true
      ? (this._toggle = "Yearly")
      : (this._toggle = "Monthly");
    const markup = `
    <div class="form__plan-container">
      <span class="form__plan">${data.planSelected} (${this._toggle})</span>
      <a href="#" class="form__plan-change">Change</a>
      <span class="form__plan-price">${data.planPrice}</span>
    </div>
    <span class="form__line"></span>
    `;
    this.finishingUpContainer.insertAdjacentHTML("afterbegin", markup);
  }

  renderFinishingUpAddOns(data, addOn, price) {
    const markup = `
    <div class="form__add-on-container">
      <span class="form__add-on">${addOn}</span>
      <span class="form__add-on-price">${data[price]}</span>
    </div>
    `;
    this.finishingUpContainer.insertAdjacentHTML("beforeend", markup);
  }

  /*
   */
  renderFinishingUpTotalPrice(data, toggleSwitch) {
    // planPrice, service, storage, profile
    const list = ["planPrice", "service", "storage", "profile"];
    const prices = [];
    let priceArr = [];
    let total = 0;
    list.forEach((price) => {
      data[price] !== "" ? prices.push(data[price]) : "";
      priceArr = prices.map((element) => {
        const numberString = element.replace(/[^\d]/g, ""); // Remove non-digit characters

        const number = parseInt(numberString);

        return number;
      });
    });

    // Adds up total to use in markup
    total = priceArr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    toggleSwitch === true
      ? (this._toggle = "per year")
      : (this._toggle = "per month");
    const markup = `
      <span class="form__total deletable">Total (${this._toggle})</span>
      <span class="form__total-price deletable">+$${total}/${
      toggleSwitch === true ? "yr" : "mo"
    }</span>
    `;

    this.totalContainer.insertAdjacentHTML("beforeend", markup);
  }

  removeRenderedFinishingUpHTML() {
    const deletable = document.querySelectorAll(".deletable");
    // deletable.forEach((ele) => ele.removeChild());
    deletable.forEach((element) => {
      while (element.firstChild) {
        element.firstChild.remove();
      }
    });
  }

  renderThankYouHTML() {
    const screenWidth = window.innerWidth;
    let markup = ``;
    screenWidth > 1440
      ? (markup = `
      Thanks for confirming your subscription! 
      We hope you have fun using our platform. 
      If you ever need support, 
      please feel free to email us at support@loremgaming.com.
    `)
      : (markup = `
      Thanks for confirming your subscription! <br />
      We hope you have fun using our <br />
      platform. If you ever need support, <br />
      please feel free to email us at <br />
      support@loremgaming.com.
    `);
    this.thankYouHTML.insertAdjacentHTML("afterbegin", markup);
  }
}
