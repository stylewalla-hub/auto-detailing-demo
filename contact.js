/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
  document.querySelector(".contact-form");

const messageField =
  document.querySelector("#contact-message");

const messageCounter =
  document.querySelector(".message-counter");


/* =========================================
   MESSAGE COUNTER
========================================= */

if (
  messageField &&
  messageCounter
) {

  const updateCounter = () => {

    messageCounter.textContent =
      `${messageField.value.length} / 500`;

  };

  messageField.addEventListener(
    "input",
    updateCounter
  );

  updateCounter();

}


/* =========================================
   FORM SUBMIT
========================================= */

if (contactForm) {

  contactForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      const button =
        contactForm.querySelector(
          ".contact-submit-button"
        );

      const buttonText =
        button.querySelector("span");

      const buttonArrow =
        button.querySelector("b");


      /* SUCCESS STATE */

      buttonText.textContent =
        "ENQUIRY SENT";

      buttonArrow.textContent =
        "✓";

      button.style.background =
        "#d9ff4f";

      button.style.color =
        "#0b0c0d";


      /* RESET */

      setTimeout(() => {

        buttonText.textContent =
          "SEND ENQUIRY";

        buttonArrow.textContent =
          "→";

        button.style.background =
          "";

        button.style.color =
          "";

        contactForm.reset();


        if (messageCounter) {

          messageCounter.textContent =
            "0 / 500";

        }

      }, 3000);

    }
  );

}





