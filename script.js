


/* =========================================
   BOOKING MODAL LOADER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("bookingModal");

  if (!modal) return;

  const frame = modal.querySelector(".booking-modal-frame");

  const closeButtons = modal.querySelectorAll(
    "[data-booking-close]"
  );


  /* -----------------------------------------
     OPEN
  ----------------------------------------- */

  const openBookingModal = () => {

    frame.src = "booking.html";

    modal.classList.add("is-open");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  };


  /* -----------------------------------------
     CLOSE
  ----------------------------------------- */

  const closeBookingModal = () => {

    modal.classList.remove("is-open");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.style.overflow = "";

    setTimeout(() => {

      frame.src = "about:blank";

    }, 400);

  };


  /* -----------------------------------------
     ALL BOOKING BUTTONS
  ----------------------------------------- */

  const bookingButtons = document.querySelectorAll(
    'a[href="booking.html"],' +
    'a[href="#booking"],' +
    '[data-booking-open]'
  );


  bookingButtons.forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openBookingModal();

      }
    );

  });


  /* -----------------------------------------
     CLOSE BUTTONS
  ----------------------------------------- */

  closeButtons.forEach(button => {

    button.addEventListener(
      "click",
      closeBookingModal
    );

  });


  /* -----------------------------------------
     ESC
  ----------------------------------------- */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal.classList.contains("is-open")
      ) {

        closeBookingModal();

      }

    }
  );

});








const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

function closeMenu() {
  mainNav.classList.remove("is-open");
  menuToggle.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();

  const isOpen = mainNav.classList.toggle("is-open");

  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

mainNav.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", () => {
  closeMenu();
});


/* =========================================
   HEADER — HIDE DOWN / SHOW UP
========================================= */

const siteHeader = document.querySelector(".site-header");

if (siteHeader) {

  let lastScrollY = window.scrollY;
  let headerTicking = false;

  function handleHeaderScroll() {

    const currentScrollY = window.scrollY;

    // Always show at the top
    if (currentScrollY <= 40) {
      siteHeader.classList.remove("header-hidden");
    }

    // Scrolling down
    else if (currentScrollY > lastScrollY) {
      siteHeader.classList.add("header-hidden");
    }

    // Scrolling up
    else if (currentScrollY < lastScrollY) {
      siteHeader.classList.remove("header-hidden");
    }

    lastScrollY = currentScrollY;
    headerTicking = false;
  }

  window.addEventListener("scroll", () => {

    if (!headerTicking) {

      window.requestAnimationFrame(
        handleHeaderScroll
      );

      headerTicking = true;
    }

  }, { passive: true });

}


/* =========================================
   NAVIGATION — ACTIVE PAGE
========================================= */

const currentPage =
  window.location.pathname
    .split("/")
    .pop()
    .toLowerCase() || "index.html";

mainNav.querySelectorAll("a").forEach(link => {

  const linkPage =
    link.getAttribute("href")
      ?.split("/")
      .pop()
      .split("#")[0]
      .toLowerCase();

  /* Active page */
  if (
    linkPage &&
    linkPage === currentPage &&
    !link.classList.contains("mobile-booking")
  ) {
    link.classList.add("active");
  }

  /* Close mobile menu */
  link.addEventListener("click", () => {
    closeMenu();
  });

});



/* =========================================
   SERVICES CAROUSEL
========================================= */

const servicesTrack =
  document.getElementById("servicesTrack");

const servicesPrev =
  document.getElementById("servicesPrev");

const servicesNext =
  document.getElementById("servicesNext");

const servicesCurrent =
  document.getElementById("servicesCurrent");

const servicesTotal =
  document.getElementById("servicesTotal");

const servicesProgress =
  document.getElementById("servicesProgress");

const serviceCards =
  document.querySelectorAll(".service-card");


let servicesIndex = 0;
let servicesTimer;


/* =========================================
   ONLY RUN IF CAROUSEL EXISTS
========================================= */

if (
  servicesTrack &&
  servicesPrev &&
  servicesNext &&
  servicesCurrent &&
  servicesTotal &&
  servicesProgress &&
  serviceCards.length
) {


  /* =========================================
     TOTAL
  ========================================= */

  servicesTotal.textContent =
    String(serviceCards.length).padStart(2, "0");


  /* =========================================
     CARD WIDTH
  ========================================= */

  function servicesCardWidth() {

    const card =
      serviceCards[0];

    const gap =
      parseFloat(
        getComputedStyle(
          servicesTrack
        ).gap
      ) || 0;

    return card.offsetWidth + gap;
  }


  /* =========================================
     UPDATE
  ========================================= */

  function updateServices() {

    const total =
      serviceCards.length;

    servicesCurrent.textContent =
      String(
        servicesIndex + 1
      ).padStart(2, "0");

    servicesProgress.style.width =
      `${((servicesIndex + 1) / total) * 100}%`;
  }


  /* =========================================
     GO TO
  ========================================= */

  function goToService(index) {

    servicesIndex =
      (index + serviceCards.length) %
      serviceCards.length;

    servicesTrack.scrollTo({

      left:
        servicesIndex *
        servicesCardWidth(),

      behavior: "smooth"

    });

    updateServices();

    restartServicesAutoPlay();
  }


  /* =========================================
     BUTTONS
  ========================================= */

  servicesNext.addEventListener(
    "click",
    () => {
      goToService(
        servicesIndex + 1
      );
    }
  );


  servicesPrev.addEventListener(
    "click",
    () => {
      goToService(
        servicesIndex - 1
      );
    }
  );


  /* =========================================
     MANUAL SWIPE
  ========================================= */

  servicesTrack.addEventListener(
    "scroll",
    () => {

      const width =
        servicesCardWidth();

      if (!width) return;

      const newIndex =
        Math.round(
          servicesTrack.scrollLeft /
          width
        );

      if (
        newIndex >= 0 &&
        newIndex < serviceCards.length
      ) {

        servicesIndex =
          newIndex;

        updateServices();

      }

    },
    { passive: true }
  );


  /* =========================================
     AUTO PLAY
  ========================================= */

  function startServicesAutoPlay() {

    servicesTimer =
      setInterval(() => {

        goToService(
          servicesIndex + 1
        );

      }, 6000);

  }


  function restartServicesAutoPlay() {

    clearInterval(
      servicesTimer
    );

    startServicesAutoPlay();

  }


  /* =========================================
     PAUSE ON HOVER
  ========================================= */

  servicesTrack.addEventListener(
    "mouseenter",
    () => {
      clearInterval(
        servicesTimer
      );
    }
  );


  servicesTrack.addEventListener(
    "mouseleave",
    () => {
      restartServicesAutoPlay();
    }
  );


  /* =========================================
     INIT
  ========================================= */

  updateServices();

  startServicesAutoPlay();

}







/* =========================================
   BEFORE / AFTER COMPARISON — SMOOTH
========================================= */

const beforeAfter =
  document.getElementById("beforeAfter");

const beforeAfterImage =
  document.getElementById("beforeAfterImage");

const beforeImageWrap =
  document.getElementById("beforeImageWrap");

const beforeImage =
  document.getElementById("beforeImage");

const beforeAfterDivider =
  document.getElementById("beforeAfterDivider");

const beforeAfterHandle =
  document.getElementById("beforeAfterHandle");


if (
  beforeAfter &&
  beforeAfterImage &&
  beforeImageWrap &&
  beforeImage &&
  beforeAfterDivider &&
  beforeAfterHandle
) {

  let isDragging = false;
  let animationFrame = null;
  let pendingX = null;

  const START_POSITION = 62;

  /* -----------------------------------------
     CACHE FRAME SIZE
  ----------------------------------------- */

  let frameWidth = 0;

  function updateFrameSize() {

    frameWidth =
      beforeAfterImage.getBoundingClientRect().width;

    beforeImage.style.width =
      `${frameWidth}px`;
  }


  /* -----------------------------------------
     SET POSITION
  ----------------------------------------- */

  function setComparisonPosition(percent) {

    const clamped = Math.min(
      100,
      Math.max(0, percent)
    );

    beforeAfterImage.style.setProperty(
      "--split",
      `${clamped}%`
    );
  }


  /* -----------------------------------------
     GET POSITION
  ----------------------------------------- */

  function getPosition(clientX) {

    const rect =
      beforeAfterImage.getBoundingClientRect();

    return (
      ((clientX - rect.left) / rect.width) * 100
    );
  }


  /* -----------------------------------------
     SMOOTH POINTER UPDATE
  ----------------------------------------- */

  function updateFromPointer(clientX) {

    pendingX = clientX;

    if (animationFrame) return;

    animationFrame =
      requestAnimationFrame(() => {

        if (pendingX !== null) {

          setComparisonPosition(
            getPosition(pendingX)
          );

        }

        pendingX = null;
        animationFrame = null;

      });
  }


  /* =========================================
     POINTER DOWN
  ========================================= */

  beforeAfterImage.addEventListener(
    "pointerdown",
    (event) => {

      isDragging = true;

      beforeAfterImage.setPointerCapture(
        event.pointerId
      );

      updateFromPointer(event.clientX);

    }
  );


  /* =========================================
     POINTER MOVE
  ========================================= */

  beforeAfterImage.addEventListener(
    "pointermove",
    (event) => {

      if (!isDragging) return;

      updateFromPointer(event.clientX);

    }
  );


  /* =========================================
     POINTER UP
  ========================================= */

  function stopDragging(event) {

    isDragging = false;

    if (animationFrame) {

      cancelAnimationFrame(
        animationFrame
      );

      animationFrame = null;

    }

    pendingX = null;

    try {

      beforeAfterImage.releasePointerCapture(
        event.pointerId
      );

    } catch (error) {}

  }


  beforeAfterImage.addEventListener(
    "pointerup",
    stopDragging
  );


  beforeAfterImage.addEventListener(
    "pointercancel",
    stopDragging
  );


  /* =========================================
     INITIALIZE
  ========================================= */

  function initializeComparison() {

    updateFrameSize();

    setComparisonPosition(
      START_POSITION
    );

  }


  /* =========================================
     RESIZE
  ========================================= */

  window.addEventListener(
    "resize",
    initializeComparison
  );


  initializeComparison();

}







/* =========================================
   PACKAGES REVEAL
========================================= */

const packageCards =
  document.querySelectorAll(".package-card");

if (packageCards.length) {

  const packageObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const card =
            entry.target;

          const index =
            [...packageCards].indexOf(card);

          setTimeout(() => {

            card.style.opacity = "1";
            card.style.transform =
              "translateY(0)";

          }, index * 120);

          packageObserver.unobserve(card);

        });

      },
      {
        threshold: 0.15
      }
    );


  packageCards.forEach((card) => {

    card.style.opacity = "0";

    card.style.transform =
      "translateY(35px)";

    card.style.transition =
      "opacity 0.8s ease, transform 0.8s cubic-bezier(.2,.8,.2,1), border-color 0.4s ease, box-shadow 0.4s ease";

    packageObserver.observe(card);

  });

}









/* =========================================
   OUR WORK — FILTER
========================================= */

const workFilterButtons =
  document.querySelectorAll(".work-filter-btn");

const workCards =
  document.querySelectorAll(".work-card");


if (
  workFilterButtons.length &&
  workCards.length
) {

  workFilterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const filter =
        button.dataset.filter;


      /* ACTIVE BUTTON */

      workFilterButtons.forEach((btn) => {
        btn.classList.remove("is-active");
      });

      button.classList.add("is-active");


      /* FILTER CARDS */

      workCards.forEach((card) => {

        const category =
          card.dataset.category;

        const shouldShow =
          filter === "all" ||
          category === filter;


        if (shouldShow) {

          card.classList.remove("is-hidden");

          card.animate(
            [
              {
                opacity: 0,
                transform: "translateY(12px)"
              },
              {
                opacity: 1,
                transform: "translateY(0)"
              }
            ],
            {
              duration: 420,
              easing: "cubic-bezier(.16,1,.3,1)"
            }
          );

        } else {

          card.classList.add("is-hidden");

        }

      });

    });

  });

}


/* =========================================
   OUR WORK — CARD REVEAL
========================================= */

if (workCards.length) {

  const workObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const card =
            entry.target;

          const index =
            [...workCards].indexOf(card);

          card.animate(
            [
              {
                opacity: 0,
                transform: "translateY(30px)"
              },
              {
                opacity: 1,
                transform: "translateY(0)"
              }
            ],
            {
              duration: 700,
              delay: index * 70,
              easing: "cubic-bezier(.16,1,.3,1)",
              fill: "forwards"
            }
          );

          workObserver.unobserve(card);

        });

      },
      {
        threshold: 0.12
      }
    );


  workCards.forEach((card) => {
    workObserver.observe(card);
  });

}







/* =========================================
   CUSTOMER STORIES — CAROUSEL
========================================= */

const storiesTrack =
  document.getElementById("storiesTrack");

const storiesPrev =
  document.querySelector(".stories-prev");

const storiesNext =
  document.querySelector(".stories-next");

const storyCards =
  document.querySelectorAll(".story-card");

const storyDots =
  document.querySelectorAll(".story-dot");


if (
  storiesTrack &&
  storyCards.length &&
  storiesPrev &&
  storiesNext
) {

  let storiesIndex = 0;


  function storiesCardWidth() {

    const card =
      storyCards[0];

    const gap =
      parseFloat(
        getComputedStyle(
          storiesTrack
        ).gap
      ) || 0;

    return card.offsetWidth + gap;

  }


  function visibleStories() {

    const width =
      storiesTrack.clientWidth;

    const cardWidth =
      storiesCardWidth();

    if (!cardWidth) return 1;

    return Math.max(
      1,
      Math.floor(
        (width + 20) / cardWidth
      )
    );

  }


  function maxStoriesIndex() {

    return Math.max(
      0,
      storyCards.length -
      visibleStories()
    );

  }


  function updateStories() {

    const max =
      maxStoriesIndex();

    storiesIndex =
      Math.max(
        0,
        Math.min(
          storiesIndex,
          max
        )
      );


    storiesPrev.disabled =
      storiesIndex === 0;

    storiesNext.disabled =
      storiesIndex === max;


    storyDots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "is-active",
          index === storiesIndex
        );

      }
    );

  }


  function goToStory(index) {

    const max =
      maxStoriesIndex();

    storiesIndex =
      Math.max(
        0,
        Math.min(
          index,
          max
        )
      );


    storiesTrack.scrollTo({

      left:
        storiesIndex *
        storiesCardWidth(),

      behavior: "smooth"

    });


    updateStories();

  }


  storiesPrev.addEventListener(
    "click",
    () => {
      goToStory(
        storiesIndex - 1
      );
    }
  );


  storiesNext.addEventListener(
    "click",
    () => {
      goToStory(
        storiesIndex + 1
      );
    }
  );


  storyDots.forEach(
    (dot) => {

      dot.addEventListener(
        "click",
        () => {

          goToStory(
            Number(
              dot.dataset.story
            )
          );

        }
      );

    }
  );


  storiesTrack.addEventListener(
    "scroll",
    () => {

      const width =
        storiesCardWidth();

      if (!width) return;

      storiesIndex =
        Math.round(
          storiesTrack.scrollLeft /
          width
        );

      updateStories();

    },
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    () => {

      storiesTrack.scrollTo({
        left:
          storiesIndex *
          storiesCardWidth(),
        behavior: "auto"
      });

      updateStories();

    }
  );


  updateStories();

}






/* =========================================
   FAQ ACCORDION
========================================= */

const faqItems =
  document.querySelectorAll(".faq-item");


if (faqItems.length) {

  faqItems.forEach((item) => {

    const button =
      item.querySelector(".faq-question");


    button.addEventListener("click", () => {

      const isOpen =
        item.classList.contains("is-open");


      /* Close all */

      faqItems.forEach((faqItem) => {

        faqItem.classList.remove("is-open");

        const faqButton =
          faqItem.querySelector(".faq-question");

        faqButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });


      /* Open selected */

      if (!isOpen) {

        item.classList.add("is-open");

        button.setAttribute(
          "aria-expanded",
          "true"
        );

      }

    });

  });

}






// ================================
// VIDEO POPUP
// ================================

document.addEventListener("DOMContentLoaded", () => {

  const videoModal = document.createElement("div");

  videoModal.className = "video-modal";

  videoModal.innerHTML = `
    <div class="video-modal-backdrop"></div>

    <div class="video-modal-window">

      <button
        class="video-modal-close"
        type="button"
        aria-label="Close video"
      >
        <span></span>
        <span></span>
      </button>

      <video
        class="video-modal-player"
        controls
        playsinline
        preload="metadata"
      >
        <source
          src="videos/detailing-process.mp4"
          type="video/mp4"
        >
      </video>

    </div>
  `;

  document.body.appendChild(videoModal);

  const videoPlayer =
    videoModal.querySelector(".video-modal-player");

  const closeButton =
    videoModal.querySelector(".video-modal-close");

  const backdrop =
    videoModal.querySelector(".video-modal-backdrop");


  // OPEN VIDEO
  const openVideo = () => {

    videoModal.classList.add("is-open");

    document.body.style.overflow = "hidden";

    videoPlayer.currentTime = 0;

    videoPlayer.play().catch(() => {});

  };


  // CLOSE VIDEO
  const closeVideo = () => {

    videoModal.classList.remove("is-open");

    document.body.style.overflow = "";

    videoPlayer.pause();

    videoPlayer.currentTime = 0;

  };


  // VIDEO BUTTONS
  document.addEventListener("click", (event) => {

    const button = event.target.closest(
      "[data-video-popup], .services-hero-watch"
    );

    if (!button) return;

    event.preventDefault();

    openVideo();

  });


  // CLOSE BUTTON
  closeButton.addEventListener("click", closeVideo);


  // CLICK OUTSIDE
  backdrop.addEventListener("click", closeVideo);


  // ESC KEY
  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      videoModal.classList.contains("is-open")
    ) {
      closeVideo();
    }

  });

});





/* =========================================
   PREVENT EMPTY # LINKS FROM JUMPING
========================================= */

document.addEventListener("click", (event) => {

  const link = event.target.closest('a[href="#"]');

  if (!link) return;

  event.preventDefault();

});