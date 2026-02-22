// Navigation menu toggle
const NavLinks = document.querySelectorAll(".nav-link");
const NavUnderlines = document.querySelectorAll(".underline");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  navLinks.forEach((link, index) => {
    if (window.location.hash === link.getAttribute("href")) {
      link.classList.add("selected-nav-link");
      NavUnderlines[index].classList.add("selected-underline");
    } else {
      NavUnderlines[index].classList.remove("selected-underline");
      link.classList.remove("selected-nav-link");
    }
  });
}

window.addEventListener("hashchange", updateActiveLink);
window.addEventListener("load", updateActiveLink);

// Hero section typewriter effect
const arr = [
  "A Front-End Developer.",
  "A Java Programmer.",
  "An Aspiring Full-Stack Developer.",
  "An IT Student.",
  "Always Improving!",
];

const rotate = document.querySelector(".rotate");

let arrindex = 0;

function typeWriter(text, i, callback) {
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
    setTimeout(callback, 3000);
  }
}

function startTextAnimation() {
  if (arrindex < arr.length) {
    typeWriter(arr[arrindex], 0, () => {
      arrindex++;
      startTextAnimation();
    });
  } else {
    arrindex = 0;
    startTextAnimation();
  }
}

startTextAnimation();
