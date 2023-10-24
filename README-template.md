## Overview

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla Javascript

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

1. Have a UI system set in place (Font, color, margin, etc)
2. Take time to plan out how you will do everything
3. Do everything right before moving on and giving your future-self that task
4. Plan out, even roughly, step-by-step what each part of the architecture and flowchart (Use forkify example)
5. Stop underestimating yourself.

### Code snippets to reuse

```JavaScript
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
```

```JavaScript
removeBreak() {
const breakpoint = 1450; // Adjust the breakpoint as needed
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
      if (breakElement.parentNode) {
        // Check if the breakElement has a parent node
        breakElement.parentNode.removeChild(breakElement); // Remove the breakElement
      }
    } else {
      // If the screen width is less than or equal to the breakpoint or the breakElement doesn't exist
      mobileArtWork.classList.remove("hidden");
      desktopArtwork.classList.add("hidden");
    }

}
```

```JavaScript
  window.addEventListener("resize", () => {
    FormNavigationBtns.removeBreak();
  });
```
