/* =========================================
   03 — SERVICE DETAILS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const serviceData = {

    interior: {
      number: "01",
      category: "INTERIOR DETAIL",
      title: `A CLEANER, HEALTHIER<br><span>RIDE.</span>`,
      description:
        "A deep interior reset designed to remove built-up dirt, dust and odors while restoring the comfort and freshness of your vehicle.",
      image: "images/service-interior.png",
      alt: "Interior car detailing",
      features: [
        "Deep cleaning",
        "Extraction",
        "Leather care",
        "Odor treatment"
      ],
      time: "2–4 HOURS",
      price: "$149+"
    },

    exterior: {
      number: "02",
      category: "EXTERIOR DETAIL",
      title: `A SHARPER, CLEANER<br><span>FINISH.</span>`,
      description:
        "A careful exterior detail focused on removing surface contamination, restoring gloss and leaving your vehicle looking sharp from every angle.",
      image: "images/service-exterior.png",
      alt: "Exterior car detailing",
      features: [
        "Safe wash",
        "Wheels & tires",
        "Decontamination",
        "Finish enhancement"
      ],
      time: "2–3 HOURS",
      price: "$129+"
    },

    paint: {
      number: "03",
      category: "PAINT CORRECTION",
      title: `BRING BACK THE<br><span>DEEPER GLOSS.</span>`,
      description:
        "Machine polishing designed to reduce swirls, light scratches and paint imperfections while bringing clarity and depth back to the finish.",
      image: "images/service-paint-correction.png",
      alt: "Paint correction service",
      features: [
        "Swirl removal",
        "Machine polishing",
        "Gloss restoration",
        "Paint refinement"
      ],
      time: "4–8 HOURS",
      price: "$299+"
    },

    protection: {
      number: "04",
      category: "PAINT PROTECTION",
      title: `PROTECT THE FINISH.<br><span>KEEP THE GLOSS.</span>`,
      description:
        "Long-term paint protection designed to help defend your vehicle's finish while adding gloss, slickness and easier maintenance.",
      image: "images/service-protection.png",
      alt: "Paint protection service",
      features: [
        "Ceramic coating",
        "Paint sealants",
        "UV protection",
        "Hydrophobic finish"
      ],
      time: "4–8 HOURS",
      price: "$599+"
    }

  };


  const tabs = document.querySelectorAll(".service-detail-tab");

  const image = document.getElementById("serviceDetailImage");
  const imageWrap = document.querySelector(".service-detail-image-wrap");

  const number = document.getElementById("serviceDetailNumber");
  const category = document.getElementById("serviceDetailCategory");

  const title = document.getElementById("serviceDetailTitle");
  const description = document.getElementById("serviceDetailDescription");

  const features = [
    document.getElementById("feature1"),
    document.getElementById("feature2"),
    document.getElementById("feature3"),
    document.getElementById("feature4")
  ];

  const time = document.getElementById("serviceDetailTime");
  const price = document.getElementById("serviceDetailPrice");


  if (
    !tabs.length ||
    !image ||
    !number ||
    !category ||
    !title ||
    !description
  ) {
    return;
  }


  function updateService(serviceKey) {

    const service = serviceData[serviceKey];

    if (!service) return;


    /* Fade image */

    imageWrap.classList.add("changing");


    setTimeout(() => {

      image.src = service.image;
      image.alt = service.alt;

      number.textContent = service.number;
      category.textContent = service.category;

      title.innerHTML = service.title;
      description.textContent = service.description;

      features.forEach((feature, index) => {

        if (feature && service.features[index]) {
          feature.textContent = service.features[index];
        }

      });

      time.textContent = service.time;
      price.textContent = service.price;


      const imageNumber =
        document.querySelector(".service-detail-image-number span");

      if (imageNumber) {
        imageNumber.textContent = service.number;
      }


      image.onload = () => {
        imageWrap.classList.remove("changing");
      };

      /* Safety fallback */

      setTimeout(() => {
        imageWrap.classList.remove("changing");
      }, 500);

    }, 180);


    /* Active tab */

    tabs.forEach(tab => {

      tab.classList.toggle(
        "active",
        tab.dataset.service === serviceKey
      );

    });

  }


  tabs.forEach(tab => {

    tab.addEventListener("click", () => {

      const serviceKey = tab.dataset.service;

      updateService(serviceKey);

    });

  });


});












/* =========================================
   04 — SERVICE FINDER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const finderOptions =
    document.querySelectorAll(".finder-option");

  const resultTitle =
    document.getElementById("finderResultTitle");

  const resultText =
    document.getElementById("finderResultText");

  const primaryButton =
    document.getElementById("finderPrimary");


  if (
    !finderOptions.length ||
    !resultTitle ||
    !resultText ||
    !primaryButton
  ) {
    return;
  }


  const recommendations = {

    interior: {
      title: `INTERIOR <span>DETAIL</span>`,
      text:
        "A deep interior reset is the right starting point when your cabin needs a complete refresh.",
      target: "#service-details"
    },

    exterior: {
      title: `EXTERIOR <span>DETAIL</span>`,
      text:
        "A careful exterior detail is a great starting point when your vehicle looks dull, dirty or needs its finish refreshed.",
      target: "#service-details"
    },

    paint: {
      title: `PAINT <span>CORRECTION</span>`,
      text:
        "Paint correction is the right direction when swirls, scratches and surface imperfections are taking away from the finish.",
      target: "#service-details"
    },

    protection: {
      title: `PAINT <span>PROTECTION</span>`,
      text:
        "Paint protection is the right choice when you want to preserve the finish and make future maintenance easier.",
      target: "#service-details"
    },

    unsure: {
      title: `LET'S <span>TAKE A LOOK.</span>`,
      text:
        "Not sure where to start? Tell us about your vehicle and we'll help you choose the service that makes the most sense.",
      target: "booking.html"
    }

  };


  function updateFinder(type) {

    const recommendation =
      recommendations[type];

    if (!recommendation) return;


    /* Active option */

    finderOptions.forEach(option => {

      option.classList.toggle(
        "active",
        option.dataset.finder === type
      );

    });


    /* Update recommendation */

    resultTitle.innerHTML =
      recommendation.title;

    resultText.textContent =
      recommendation.text;


    /* Update button */

    primaryButton.href =
      recommendation.target;


    if (type === "unsure") {

      primaryButton.querySelector("span").textContent =
        "GET A PERSONAL RECOMMENDATION";

    } else {

      primaryButton.querySelector("span").textContent =
        "VIEW RECOMMENDED SERVICE";

    }

  }


  finderOptions.forEach(option => {

    option.addEventListener("click", () => {

      updateFinder(
        option.dataset.finder
      );

    });

  });


});











/* =========================================
   06 — FAQ ACCORDION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const faqItems =
    document.querySelectorAll(".faq-item");


  if (!faqItems.length) return;


  faqItems.forEach(item => {

    const question =
      item.querySelector(".faq-question");

    const toggle =
      item.querySelector(".faq-toggle");


    question.addEventListener("click", () => {

      const isActive =
        item.classList.contains("active");


      /* Close all */

      faqItems.forEach(otherItem => {

        otherItem.classList.remove("active");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        const otherToggle =
          otherItem.querySelector(".faq-toggle");


        otherQuestion.setAttribute(
          "aria-expanded",
          "false"
        );

        otherToggle.textContent = "+";

      });


      /* Open clicked item */

      if (!isActive) {

        item.classList.add("active");

        question.setAttribute(
          "aria-expanded",
          "true"
        );

        toggle.textContent = "−";

      }

    });

  });

});