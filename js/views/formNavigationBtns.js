import * as Controller from "../controller.js";
import PaginationView from "./paginationView.js";
import View from "./View.js";

class FormNavigationBtns extends View {
  nextStepBtn = document.querySelector(".next-btn");
  backStepBtn = document.querySelector(".back-btn");
  btnContainer = document.querySelector(".btn-section");

  nameInputError = document.querySelector(".input-name");
  emailInputError = document.querySelector(".input-email");
  numberInputError = document.querySelector(".input-number");

  nameMsgError = document.querySelector(".name-error");
  emailMsgError = document.querySelector(".email-error");
  numberMsgError = document.querySelector(".number-error");

  generateFormBtnsText() {
    this.generateFormNextBtnText();
  }

  generateFormNextBtnText() {
    const currentPage = Controller.currentPage();
    // the [1, 2, 3] is equivalent to an array. array.includes currentPage
    if ([1, 2, 3].includes(currentPage)) {
      this.nextStepBtn.textContent = "Next Step";
      if (this.nextStepBtn.classList.contains("confirm")) {
        this.nextStepBtn.classList.remove("confirm");
        this.nextStepBtn.classList.add("next");
      } else return;
    } else if ([4].includes(currentPage)) {
      this.nextStepBtn.textContent = "Confirm";
      // if (window.innerWidth > 1450) {
      this.nextStepBtn.classList.remove("next");
      this.nextStepBtn.classList.add("confirm");
      // }
    }
  }

  generateFormBackBtnText() {
    const currentPage = Controller.currentPage();
    if ([2, 3, 4].includes(currentPage)) {
      this.backStepBtn.textContent = "";
      this.backStepBtn.insertAdjacentHTML("afterbegin", "Go Back");
    }
    if ([1].includes(currentPage)) {
      this.backStepBtn.textContent = "";
    }
  }

  getActiveSection() {
    return document.querySelector(".section.active");
  }

  getActiveClassName() {
    const activeSection = this.getActiveSection();
    const sectionClassName = activeSection.classList[0];
    return sectionClassName;
  }

  goToNextStep() {
    const activeSection = this.getActiveSection();
    let nextPage = Controller.currentPage() + 1;
    const section = document.querySelector(`.section-${nextPage}`);
    activeSection.classList.remove("active");
    section.classList.add("active");
    Controller.updateCurrPage("forward");
  }

  generatePreviousFormPage() {
    const activeSection = this.getActiveSection();
    let nextPage = Controller.currentPage() - 1;
    let section = document.querySelector(`.section-${nextPage}`);
    activeSection.classList.remove("active");
    section.classList.add("active");
    Controller.updateCurrPage("back");
  }

  personalInfoFormValidation() {
    if (Controller.currentPage() === 1) {
      const emailPattern = /@.*\.com/;

      const isNameValid =
        this.nameInputError.value.length >= 4 &&
        /^[A-Za-z\s]+$/.test(this.nameInputError.value) &&
        this.nameInputError.value.trim() !== "";

      const isEmailValid =
        this.emailInputError.value.length > 1 &&
        emailPattern.test(this.emailInputError.value);

      const isNumberValid =
        /^[\d\s]+$/.test(this.numberInputError.value) &&
        this.numberInputError.value.replace(/\s/g, "").length >= 10;

      const valid = isNameValid && isNumberValid && isEmailValid;

      // Name
      this.nameMsgError.style.display = isNameValid ? "none" : "flex";
      this.nameInputError.style.borderColor = isNameValid
        ? "hsl(229, 24%, 87%)"
        : "#ff0000";
      // Email
      this.emailMsgError.style.display = isEmailValid ? "none" : "flex";
      this.emailInputError.style.borderColor = isEmailValid
        ? "hsl(229, 24%, 87%)"
        : "#ff0000";
      // Number
      this.numberMsgError.style.display = isNumberValid ? "none" : "flex";
      this.numberInputError.style.borderColor = isNumberValid
        ? "hsl(229, 24%, 87%)"
        : "#ff0000";

      this.nameMsgError.setAttribute("aria-hidden", isNameValid);
      this.nameMsgError.setAttribute("aria-invalid", !isNameValid);
      this.emailMsgError.setAttribute("aria-hidden", isEmailValid);
      this.emailMsgError.setAttribute("aria-invalid", !isEmailValid);
      this.numberMsgError.setAttribute("aria-hidden", isNumberValid);
      this.numberMsgError.setAttribute("aria-invalid", !isNumberValid);

      return valid;
    }
  }

  nextFormStep() {
    this.nextStepBtn.addEventListener("click", (e) => {
      if (
        Controller.currentPage() === 1 &&
        this.personalInfoFormValidation() === false
      )
        return;
      if (Controller.currentPage() === 4) {
        PaginationView.displayLastFormPage();
        return;
      }
      e.preventDefault();
      const activeSection = this.getActiveSection();
      const sectionClassName = this.getActiveClassName();
      const data = this.collectFormInfo(sectionClassName, activeSection);
      Controller.sendFormInfoToModel(sectionClassName, ...data);
      this.goToNextStep();
      PaginationView.paginationStepForward();
      this.generateFormNextBtnText();
      this.generateFormBackBtnText();
      if (Controller.currentPage() === 4) this.changePlanButton();
    });
  }

  goToPreviousFormPageReusable() {
    if (Controller.currentPage() === 4) {
      this.removeRenderedFinishingUpHTML();
      Controller.resetAddOnModelData();
    }
    this.generatePreviousFormPage();
    PaginationView.paginationStepBack();
    this.generateFormNextBtnText();
    this.generateFormBackBtnText();
  }

  goToPreviousFormStep() {
    this.backStepBtn.addEventListener(
      "click",
      this.goToPreviousFormPageReusable.bind(this)
    );
  }

  changePlanButton() {
    const changeBtn = document.querySelector(".form__plan-change");
    changeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.goToPreviousFormPageReusable();
      this.goToPreviousFormPageReusable();
    });
  }

  collectFormInfo(sectionClassName, section) {
    switch (sectionClassName) {
      case "section-1":
        return this.collectPersonalInfo(section);
      case "section-2":
        return this.collectPlanInfo(section);
      case "section-3":
        return this.collectAddOnsInfo();
      case "section-4":
        return;

      default:
        return "No section is active!";
    }
  }

  removeBreak() {
    // Change name
    const breakpoint = 1440; // Adjust the breakpoint as needed
    const screenWidth = window.innerWidth;
    const breakElement = document.querySelector(".line-break");
    const desktopArtwork = document.querySelector(
      ".background-design--desktop"
    );
    const mobileArtWork = document.querySelector(".artwork-container");

    if (screenWidth > breakpoint) {
      // If the screen width is greater than the breakpoint and the breakElement exists
      mobileArtWork.classList.add("hidden");
      desktopArtwork.classList.remove("hidden");
      if (breakElement) {
        // Check if the breakElement exists before trying to access its parentNode
        if (breakElement.parentNode) {
          breakElement.parentNode.removeChild(breakElement);
        }
      }
    } else {
      // If the screen width is less than or equal to the breakpoint or the breakElement doesn't exist
      mobileArtWork.classList.remove("hidden");
      desktopArtwork.classList.add("hidden");
    }
  }
}

export default new FormNavigationBtns();
