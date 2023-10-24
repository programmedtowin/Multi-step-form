import * as Controller from "../controller.js";
import View from "./View.js";
import FormNavigationBtns from "./formNavigationBtns.js";

class PaginationView extends View {
  displayLastFormPage() {
    // Hides Btn Section
    FormNavigationBtns.generateFormNextBtnText();
    const btnSection = document.querySelector(".btn-section");
    btnSection.classList.add("hidden");
    // Adjusts bottom Margin for last page
    const formMarginAdjustment = document.querySelector(".form");
    formMarginAdjustment.style.marginBottom = "250px";
    // Add text dynamically via View
    this.renderThankYouHTML();
    // Displays last page
    const activeSection = FormNavigationBtns.getActiveSection();
    activeSection.classList.remove("active");
    const lastPage = document.querySelector(".section-5");
    lastPage.classList.add("active");
  }

  paginationStepForward() {
    const currPaginationStep = document.querySelectorAll(
      `.step-${Controller.currentPage() - 1}`
    );
    // currPaginationStep[(0, 1)].classList.remove("active-step");
    [0, 1].forEach((index) =>
      currPaginationStep[index].classList.remove("active-step")
    );

    const nextPaginationStep = document.querySelectorAll(
      `.step-${Controller.currentPage()}`
    );
    // nextPaginationStep[(0, 1)].classList.add("active-step");
    [0, 1].forEach((index) =>
      nextPaginationStep[index].classList.add("active-step")
    );
  }

  paginationStepBack() {
    const currPaginationStep = document.querySelectorAll(
      `.step-${Controller.currentPage() + 1}`
    );
    // currPaginationStep.classList.remove("active-step");
    [0, 1].forEach((index) =>
      currPaginationStep[index].classList.remove("active-step")
    );
    const nextPaginationStep = document.querySelectorAll(
      `.step-${Controller.currentPage()}`
    );
    // nextPaginationStep.classList.add("active-step");
    [0, 1].forEach((index) =>
      nextPaginationStep[index].classList.add("active-step")
    );
  }
}

export default new PaginationView();
