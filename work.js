document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     GALLERY FILTER
  ========================================= */

  const filters = document.querySelectorAll(".gallery-filter");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filters.length || !galleryItems.length) {
    return;
  }


  filters.forEach(filter => {

    filter.addEventListener("click", () => {

      const selectedCategory =
        filter.dataset.filter;


      /* -----------------------------
         Active filter
      ----------------------------- */

      filters.forEach(button => {
        button.classList.remove("active");
      });

      filter.classList.add("active");


      /* -----------------------------
         Filter images
      ----------------------------- */

      galleryItems.forEach(item => {

        const itemCategory =
          item.dataset.category;

        if (
          selectedCategory === "all" ||
          itemCategory === selectedCategory
        ) {

          item.classList.remove("is-hidden");

        } else {

          item.classList.add("is-hidden");

        }

      });

    });

  });

});