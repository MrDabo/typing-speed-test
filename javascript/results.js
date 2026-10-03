console.log(history.state);
let state = history.state ?? {
  wpm: 0,
  accuracy: "0%",
  characters: { right: 0, wrong: 0 },
  prompt: "baseline",
};

let selectedPrompt = state.prompt;
const prompts = {
  normal: {
    src: "assets/images/icon-completed.svg",
    caption: "Test Complete!",
    p: "Solid run. Keep pusing to beat you high score.",
  },
  baseline: {
    src: "assets/images/icon-completed.svg",
    caption: "Baseline Established!",
    p: "You've set the bar. Now the real challenge begins-time to beat it. ",
  },
  pb: {
    src: "assets/images/icon-new-pb.svg",
    caption: "High score Samashed!",
    p: "You're getting faster. THat was incredible typing.",
  },
};
document.querySelector("figure img").src = prompts[selectedPrompt].src;
document.querySelector("h1").textContent = prompts[selectedPrompt].caption;
document.querySelector("h1 + p").textContent = prompts[selectedPrompt].p;
document.getElementById("wpm").textContent = state.wpm;
document.getElementById("accuracy").textContent = state.accuracy;

let acuracyValue = Number(state.accuracy.slice(0, state.accuracy.length - 1));
if (acuracyValue <= 100 && acuracyValue > 95) {
  document.getElementById("accuracy").classList.add("green");
} else if (acuracyValue <= 95 && acuracyValue > 90) {
  document.getElementById("accuracy").classList.add("yellow");
} else {
  document.getElementById("accuracy").classList.add("red");
}

document.querySelector("#characters .right").textContent =
  state.characters.right;
document.querySelector("#characters .wrong").textContent =
  state.characters.wrong;
document.querySelector("button").addEventListener("click", () => {
  window.location.assign("/");
  c;
});
