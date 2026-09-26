/* =========================================
   ABOUT — PROCESS ACCORDION
========================================= */

document.querySelectorAll(".about-process-item").forEach((item) => {

  item.addEventListener("click", () => {

    document
      .querySelectorAll(".about-process-item")
      .forEach((processItem) => {
        processItem.classList.remove("active");
      });

    item.classList.add("active");

  });

});