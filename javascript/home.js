"use strict";
import data from "../data.json" with { type: "json" };

let difficulty = document
  .getElementById("difficulty-select")
  .value.toLowerCase();
let mode = document.getElementById("mode-select").value.toLowerCase();

document.addEventListener("readystatechange", (e) => {
  document.readyState === "complete" && initApp();
});

const initApp = () => {
  document
    .getElementById("difficulty-select")
    .addEventListener("change", (e) => {
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

  const modeButtons = Array.from(
    document.getElementsByClassName("mode-button"),
  );

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
};

function start() {
  let correctWords = 0;
  let mistake = 0;
  document.querySelector("main > section div").remove();
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
  let wpm = 0;
  let accuracy = "100%";
  let time;
  let seconds = 0;
  window.setInterval(() => seconds++, 1000);
  if (mode.includes("timed")) {
    time = 60;
    window.setInterval(() => {
      time > 0 && time--;
      time == 0 &&
        pushResults({
          wpm: wpm,
          accuracy: accuracy,
          characters: { right: correctWords, wrong: mistake },
          prompt: !localStorage.getItem("personalBest")
            ? "baseline"
            : localStorage.getItem("personalBest") < wpm
              ? "pb"
              : "normal",
        });
      if (time === 45) {
        document.getElementById("time").classList.add("yellow");
      } else if (time === 25) {
        document.getElementById("time").classList.remove("yellow");
        document.getElementById("time").classList.add("red");
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
        if (e.key === paragraph[index]) {
          Article.querySelector(`span:nth-child(${index + 1})`).classList.add(
            "correct",
          );

          correctWords++;
          wpm = wordsPerMinutes(seconds, index + 1);
        } else {
          Article.querySelector(`span:nth-child(${index + 1})`).classList.add(
            "incorrect",
          );

          mistake++;
          accuracy = calculateAcurracy(paragraph.length, mistake);
        }
        if (index === paragraph.length - 1) {
          pushResults({
            wpm: wpm,
            accuracy: accuracy,
            characters: { right: correctWords, wrong: mistake },
            prompt: !localStorage.getItem("personalBest")
              ? "baseline"
              : localStorage.getItem("personalBest") < wpm
                ? "pb"
                : "normal",
          });
        } else {
          index++;
        }

        break;
    }
  });
}

function wordsPerMinutes(seconds, words) {
  const wpm = document.getElementById("wpm");
  wpm.textContent = Math.round(words / 5 / (seconds / 60));
  console.log(
    "words:",
    words,
    "\n",
    "seconds:",
    seconds,
    "\n",
    "wpm",
    Math.round(words / 5 / (seconds / 60)),
  );
  return Math.round(words / 5 / (seconds / 60));
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
  acurracy.textContent = acurracy < 0 ? "0%" : `${acurracyValue}%`;
  return acurracy < 0 ? "0%" : `${acurracyValue}%`;
}
//
function formatTime(time) {
  let hour = Math.floor(time / (60 * 60));

  let minutes = Math.floor(time / 60);

  let seconds = time - hour * (60 * 60) - minutes * 60;

  return `${hour ? hour + ":" : ""}${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

function pushResults(object1) {
  if (object1.prompt === "pb" || object1.prompt === "baseline") {
    localStorage.setItem("personalBest", object1.wpm);
  }
  window.history.pushState(object1, "", "results.html");
  location.reload();
}
