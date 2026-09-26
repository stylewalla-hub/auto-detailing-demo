/* =========================================
   BOOKING FORM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const bookingForm = document.getElementById("bookingForm");
  const bookingSuccess = document.getElementById("bookingSuccess");

  if (!bookingForm || !bookingSuccess) return;


  bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    bookingForm.style.display = "none";

    bookingSuccess.classList.add("is-visible");

  });

});