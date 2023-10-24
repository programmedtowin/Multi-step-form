import View from "./View.js";

class AddOnsView extends View {
  addOnBtns = document.querySelectorAll(".add-on");

  addOnBtnsEventListeners() {
    this.addOnBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (e.target.tagName === "DIV" || e.target.tagName === "INPUT")
          this.checkBoxClicked(e);
      });
    });
  }

  checkBoxClicked(e) {
    const checkBoxSection = e.target.closest('div[class*="add-on"]');
    const checkBoxClassName = checkBoxSection.classList[0];
    const checkBox = document.getElementById(`${checkBoxClassName}`);
    e.target.tagName === "INPUT"
      ? this.toggleCheckBoxColor(checkBox, checkBoxClassName)
      : (this.toggleCheckBox(checkBox),
        this.toggleCheckBoxColor(checkBox, checkBoxClassName));
  }

  toggleCheckBox(checkBox) {
    checkBox.checked = !checkBox.checked;
  }

  toggleCheckBoxColor(checkBox, checkBoxClassName) {
    checkBox.checked
      ? this.generateClickedColors(checkBoxClassName)
      : this.generateColorReset(checkBoxClassName);
  }
}

export default new AddOnsView();
