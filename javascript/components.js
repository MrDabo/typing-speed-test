"use strict";

document.addEventListener("readystatechange", (e) => {
  document.readyState === "complete" && loadComponents();
});

const loadComponents = async () => {
  const response = await fetch("components/header.html");
  const header = await response.text();
  document.querySelector("body").insertAdjacentHTML("afterbegin", header);
  const bestValue = document.getElementById("best-value");
  bestValue.textContent = window.localStorage.getItem("best") || " 0WPM";
};
