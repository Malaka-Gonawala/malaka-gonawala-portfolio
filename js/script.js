// Smooth scroll
const lenis = new Lenis({
  smooth: true,
  duration: 1.2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Preloader animation
document.addEventListener("DOMContentLoaded", () => {
  preloadScroll();
  document.body.style.overflow = "hidden";

  const preload = document.querySelector("#Preloader");
  setTimeout(() => {
    preload.style.opacity = 0;
    document.body.style.overflow = "auto";
    setTimeout(() => {
      preload.style.display = "none";
    }, 1000);
  }, 3000);
});

function preloadScroll() {
  window.scrollTo({
    top: 1,
    behavior: "smooth",
  });
}

// Hero section typewriter effect
const arr = [
  "A Front-End Developer.",
  "A Java Programmer.",
  "An Aspiring Full-Stack Developer.",
  "An IT Student.",
  "Always Improving!",
];

const rotate = document.querySelector(".rotate");

let arrIndex = 0;

function typeWriter(text, i, callback) {
  if (arrIndex === arr.length - 1) {
    rotate.style.textShadow = ` 0 0 30px #d3c09c, 0 0 40px #d3c09c, 0 0 55px #d3c09c, 0 0 100px #d3c09c`;
  } else {
    rotate.style.textShadow = ` 0 0 5px #d3c09c`;
  }
  if (i < text.length) {
    rotate.innerHTML =
      text.substring(0, i + 1) + '<span class="cursor"></span>';
    setTimeout(() => typeWriter(text, i + 1, callback), 100);
  } else {
    setTimeout(() => {
      for (let j = 0; j < text.length; j++) {
        setTimeout(() => {
          rotate.innerHTML =
            text.substring(0, text.length - j - 1) +
            '<span class="cursor"></span>';
        }, j * 30);
      }
    }, 2000);
    setTimeout(callback, 3500);
  }
}

function startTextAnimation() {
  if (arrIndex < arr.length) {
    typeWriter(arr[arrIndex], 0, () => {
      arrIndex++;
      startTextAnimation();
    });
  } else {
    arrIndex = 0;
    startTextAnimation();
  }
}
setTimeout(() => {
  startTextAnimation();
}, 4500);

/* Skills lightbox behavior: center clicked skill and reveal transitions */
document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".skills .skills-container");
  let active = null;
  let activeOverlay = null;

  if (!containers.length) return;

  // function to close currently active skill with staged reverse timing
  function closeActive() {
    if (!active) return;
    // first shrink progress
    active.classList.remove("progress-visible");
    // then shrink the proficiency bar after 200ms
    setTimeout(() => {
      active.classList.remove("bars-visible");
      if (activeOverlay) {
        activeOverlay.classList.remove("visible");
        activeOverlay.setAttribute("aria-hidden", "true");
      }
    }, 200);
    // finally remove active and restore scrolling after another 220ms
    setTimeout(() => {
      if (active) active.classList.remove("active");

      // re-enable all other skills
      const allSkills = document.querySelectorAll(".skills .skill");
      allSkills.forEach((s) => {
        if (s !== active) {
          s.style.pointerEvents = "auto";
          s.style.opacity = "1";
          s.style.cursor = "pointer";
        }
      });

      document.body.style.overflow = "";
      active = null;
      activeOverlay = null;
      if (window._skillDocCloseHandler) {
        document.removeEventListener("click", window._skillDocCloseHandler);
        window._skillDocCloseHandler = null;
      }
    }, 420);
  }

  containers.forEach((container) => {
    // ensure container is a positioning context
    container.style.position = container.style.position || "relative";

    // create a per-container overlay
    const overlay = document.createElement("div");
    overlay.className = "container-overlay";
    overlay.setAttribute("aria-hidden", "true");
    container.appendChild(overlay);

    const skills = container.querySelectorAll(".skill");

    // ensure each skill has a close button (do not change existing classes/ids)
    skills.forEach((skill) => {
      if (!skill.querySelector(".close-btn")) {
        const btn = document.createElement("button");
        btn.className = "close-btn";
        btn.setAttribute("aria-label", "Close");
        btn.innerHTML = "&times;";
        // clicking the close button should close the active skill without bubbling
        btn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          closeActive();
        });
        skill.appendChild(btn);
      }
    });

    skills.forEach((skill) => {
      skill.addEventListener("click", (e) => {
        e.stopPropagation(); // don't let this click bubble to document close handler
        // if clicked skill is already active, ignore
        if (active === skill) return;

        // if another skill is active in ANY container, do not allow new activation
        if (active) return;

        // if another skill is active, begin quick reverse sequence
        if (active && active !== skill) {
          active.classList.remove("progress-visible");
          setTimeout(() => {
            active.classList.remove("bars-visible");
            if (activeOverlay) {
              activeOverlay.classList.remove("visible");
              activeOverlay.setAttribute("aria-hidden", "true");
            }
          }, 180);
          setTimeout(() => {
            if (active) active.classList.remove("active");
          }, 360);
        }

        // activate clicked skill within its container
        skill.classList.add("active");

        // disable all other skills in all containers
        const allSkills = document.querySelectorAll(".skills .skill");
        allSkills.forEach((s) => {
          if (s !== skill) {
            s.style.pointerEvents = "none";
            s.style.opacity = "0.5";
            s.style.cursor = "not-allowed";
          }
        });

        // tiny delay so the initial click won't trigger a global close
        setTimeout(() => {
          overlay.classList.add("visible");
          overlay.setAttribute("aria-hidden", "false");
        }, 10);
        document.body.style.overflow = "hidden";
        active = skill;
        activeOverlay = overlay;

        // staged reveal: show proficiency bar after 0.2s, then progress after 0.5s
        setTimeout(() => skill.classList.add("bars-visible"), 200);
        setTimeout(() => skill.classList.add("progress-visible"), 500);

        // add document-level click handler to close when clicking anywhere
        if (window._skillDocCloseHandler)
          document.removeEventListener("click", window._skillDocCloseHandler);
        window._skillDocCloseHandler = function docClose() {
          closeActive();
        };
        document.addEventListener("click", window._skillDocCloseHandler);
      });
    });

    // clicking the overlay closes the active skill
    overlay.addEventListener("click", () => {
      closeActive();
    });
  });

  // global escape key closes any active
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && active) closeActive();
  });
});

// Header size shrinking on scroll
const header = document.querySelector("header");
document.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.height = "110px";
  } else {
    header.style.height = "160px";
  }
});

const preloaderBrand = document.querySelector(".brand");
const navbarLogo = document.querySelector(".logo");

window.addEventListener("load", () => {
  // Get navbar position
  const rect = navbarLogo.getBoundingClientRect();

  const offsetY = rect.height / 2 - preloaderBrand.offsetHeight / 2;

  preloaderBrand.style.setProperty(
    "--navbar-top",
    rect.top + window.scrollY + offsetY + "px",
  );
  preloaderBrand.style.setProperty(
    "--navbar-left",
    rect.left + window.scrollX + "px",
  );
  // Trigger animation
  setTimeout(() => {
    preloaderBrand.classList.add("loaded");
  }, 1500);

  // Fade out preloader after animation
  setTimeout(() => {
    document.getElementById("Preloader").style.opacity = 0;
  }, 2500);
});
