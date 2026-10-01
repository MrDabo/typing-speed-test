"use strict";
import data from "../data.json" with { type: "json" };

let difficulty = document
  .getElementById("difficulty-select")
  .value.toLowerCase();
let mode = document.getElementById("mode-select").value.toLowerCase();

document.getElementById("difficulty-select").addEventListener("change", (e) => {
  difficulty = e.target.value.toLowerCase();
  console.log(difficulty);
});

document.getElementById("mode-select").addEventListener("change", (e) => {
  mode = e.target.value.toLowerCase();
  console.log(mode);
});

const difficultyButtons = Array.from(
  document.getElementsByClassName("difficulty-button"),
);

difficultyButtons.forEach((difficultyButton) => {
  difficultyButton.addEventListener("click", () => {
    difficultyButtons.forEach((button) => {
      if (button === difficultyButton) {
        button.classList.add("selected");
        difficulty = button.textContent.toLowerCase();
      } else {
        button.classList.remove("selected");
      }
    });
  });
});

const modeButtons = Array.from(document.getElementsByClassName("mode-button"));

modeButtons.forEach((modeButton) => {
  modeButton.addEventListener("click", () => {
    modeButtons.forEach((button) => {
      if (button === modeButton) {
        button.classList.add("selected");
        mode = button.textContent.toLowerCase();
      } else {
        button.classList.remove("selected");
      }
    });
  });
});

document
  .querySelector("main > section > div")
  .addEventListener("click", () => start());

function start() {
  let correctWords = 0;
  let mistake = 0;
  document.querySelector("main > section div").style.display = "none";
  const Article = document.querySelector("main > section > article");
  Article.textContent = "";

  const paragraph =
    data[`${difficulty}`][
      Math.floor(Math.random() * data[`${difficulty}`].length)
    ].text;
  Array.from(paragraph).forEach((e) => {
    const span = document.createElement("span");
    span.textContent = `${e}`;
    Article.append(span);
  });

  let index = 0;
  let time;
  if (mode === "timed") {
    time = 60;
    window.setInterval(() => {
      time > 0 && time--;
      if (time < 0) {
      } else if (time === 25) {
        document.getElementById("time").classList.remove("yellow");
        document.getElementById("time").classList.add("red");
      } else if (time === 45) {
        document.getElementById("time").classList.add("yellow");
      }
      document.getElementById("time").textContent = formatTime(time);
    }, 1000);
  } else {
    time = 0;
    window.setInterval(() => {
      time++;

      document.getElementById("time").textContent = formatTime(time);
    }, 1000);
  }

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "CapsLock":
        console.log("CapsLock");
        break;

      case "Backspace":
        if (index !== 0) {
          index--;
          Article.querySelector(
            `span:nth-child(${index + 1})`,
          ).classList.remove("correct");
          Article.querySelector(
            `span:nth-child(${index + 1})`,
          ).classList.remove("incorrect");
        }
        break;

      default:
        console.log(e.key);
        if (e.key === paragraph[index]) {
          Article.querySelector(`span:nth-child(${index + 1})`).classList.add(
            "correct",
          );
          index++;
          correctWords++;
          wordsPerMinutes();
        } else {
          Article.querySelector(`span:nth-child(${index + 1})`).classList.add(
            "incorrect",
          );
          index++;
          mistake++;
          calculateAcurracy(paragraph.length, mistake);
        }
    }
    wordsPerMinutes(time, index);
  });
}

function wordsPerMinutes(time, words) {
  const wpm = document.getElementById("wpm");
  // wpm.textContent = Math.trunc((60 * words) / time);
}

function calculateAcurracy(paragraph, mistake) {
  const acurracy = document.getElementById("accuracy");
  const acurracyValue = Math.trunc(((paragraph - mistake) / paragraph) * 100);
  if (acurracyValue === 95) {
    acurracy.classList.add("yellow");
  } else if (acurracyValue === 90) {
    acurracy.classList.remove("yellow");
    acurracy.classList.add("red");
  }
  acurracy.textContent = `${acurracyValue}%`;
}
// hithrkdkdk
function formatTime(time) {
  let hour = Math.floor(time / (60 * 60));
  let minutes = Math.floor(time / 60);

  let seconds = time - hour * (60 * 60) - minutes * 60;
  return `${hour ? hour + ":" : ""}${minutes}:${seconds < 10 ? seconds + "0" : seconds}`;
}
