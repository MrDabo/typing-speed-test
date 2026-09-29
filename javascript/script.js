"use strict";

import data from "../data.json" with { type: "json" };

document.addEventListener("readystatechange", () => {
  if (document.readyState === "complete") initApp();
});

function initApp() {
  let difficulty = "easy";
  let mode = "timed";
  let char = 0;
  const bestValue = document.getElementById("best-value");
  bestValue.textContent = window.localStorage.getItem("best")
    ? `${window.localStorage.getItem("best")}WPM`
    : "0WPM";
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
    difficultyButton.addEventListener("click", (event) => {
      difficulty = event.target.textContent.toLowerCase();
      difficultyButtons.forEach((element) => {
        if (
          element.textContent.toLowerCase() ===
          event.target.textContent.toLowerCase()
        ) {
          element.classList.add("selected");
        } else {
          element.classList.remove("selected");
        }
      });
    });
  });

  const modeButtons = Array.from(
    document.getElementsByClassName("mode-button"),
  );
  modeButtons.forEach((modeButton) => {
    modeButton.addEventListener("click", (event) => {
      mode = event.target.textContent.toLowerCase();
      modeButtons.forEach((element) => {
        if (
          element.textContent.toLowerCase() ===
          event.target.textContent.toLowerCase()
        ) {
          element.classList.add("selected");
        } else {
          element.classList.remove("selected");
        }
      });
    });
  });

  document.querySelector(".text-area div").addEventListener("click", (e) => {
    let test =
      data[`${difficulty}`][
        Math.floor(Math.random() * data[`${difficulty}`].length)
      ];
    test = Array.from(test.text);
    document.querySelector(".text-area article").textContent = "";
    test.forEach((e) => {
      let span = document.createElement("span");
      span.textContent = e;
      document.querySelector(".text-area article").appendChild(span);
    });

    e.currentTarget.style.display = "none";

    document.addEventListener("keydown", (e) => {
      console.log(e.key);
      console.log(test[char]);
      if (e.key === "CapsLock") {
      } else if (e.key === "Backspace") {
        if (char !== 0) char--;
        document
          .querySelector(`.text-area article span:nth-child(${char - 1})`)
          .classList.add("correct");
      } else if (e.key === test[char]) {
        document
          .querySelector(`.text-area article span:nth-child(${char + 1})`)
          .classList.add("correct");
        char++;
      } else {
        document
          .querySelector(`.text-area article span:nth-child(${char + 1})`)
          .classList.add("incorrect");
        char++;
      }
    });
  });
  document.querySelector(".text-area div").addEventListener("keydown", (e) => {
    let test =
      data[`${difficulty}`][
        Math.floor(Math.random() * data[`${difficulty}`].length)
      ];
    document.querySelector(".text-area article").textContent = test.text;

    console.log(test);
    e.currentTarget.style.display = "none";
  });
}
