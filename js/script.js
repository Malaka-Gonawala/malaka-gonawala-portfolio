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
