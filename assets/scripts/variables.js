const paths = [
  [
    "up",
    `<path d="M256,48C141.13,48,48,141.13,48,256s93.13,208,208,208,208-93.13,208-208S370.87,48,256,48Zm91.36,212.65a16,16,0,0,1-22.63.09L272,208.42V342a16,16,0,0,1-32,0V208.42l-52.73,52.32A16,16,0,1,1,164.73,238l80-79.39a16,16,0,0,1,22.54,0l80,79.39A16,16,0,0,1,347.36,260.65Z"/></svg>`,
  ],
  [
    "down",
    `<path d="M256,464c114.87,0,208-93.13,208-208S370.87,48,256,48,48,141.13,48,256,141.13,464,256,464ZM164.64,251.35a16,16,0,0,1,22.63-.09L240,303.58V170a16,16,0,0,1,32,0V303.58l52.73-52.32A16,16,0,1,1,347.27,274l-80,79.39a16,16,0,0,1-22.54,0l-80-79.39A16,16,0,0,1,164.64,251.35Z"/>`,
  ],
  [
    "forward",
    `<path d="M464,256c0-114.87-93.13-208-208-208S48,141.13,48,256s93.13,208,208,208S464,370.87,464,256ZM251.35,347.36a16,16,0,0,1-.09-22.63L303.58,272H170a16,16,0,0,1,0-32H303.58l-52.32-52.73A16,16,0,1,1,274,164.73l79.39,80a16,16,0,0,1,0,22.54l-79.39,80A16,16,0,0,1,251.35,347.36Z"/>`,
  ],
  [
    "back",
    `<path d="M48,256c0,114.87,93.13,208,208,208s208-93.13,208-208S370.87,48,256,48,48,141.13,48,256Zm212.65-91.36a16,16,0,0,1,.09,22.63L208.42,240H342a16,16,0,0,1,0,32H208.42l52.32,52.73A16,16,0,1,1,238,347.27l-79.39-80a16,16,0,0,1,0-22.54l79.39-80A16,16,0,0,1,260.65,164.64Z"/>`,
  ],
];
const container = document.getElementsByClassName("container")[0];
const blocks = document.getElementsByClassName("block");
const numbers = document.getElementsByClassName("number");
const color = {
  up: "#eb4d4b",
  down: "#6ab04c",
  forward: "#f0932b",
  back: "#686de0",
};
const sizeStandard = {
  5: { padding: "0.5rem", size: "4rem", fontSize: "3.5rem" },
  6: { padding: "0.5rem", size: "3.1875rem", fontSize: "2.6875rem" },
  7: { padding: "0.5rem", size: "2.5rem", fontSize: "2rem" },
  8: { padding: "0.5rem", size: "2.0625rem", fontSize: "1.5625rem" },
  9: { padding: "0.3125rem", size: "2rem", fontSize: "1.5rem" },
  10: { padding: "0.3125rem", size: "1.75rem", fontSize: "1.25rem" },
};
let blocksPicked = { id: [], direction: [] };
let muteAudio = false;
let size = 5;
let maxLevel = 3;

const home = document.getElementsByClassName("home")[0];
const state = document.getElementsByClassName("state")[0];
const play = document.getElementsByClassName("play")[0];
const pause = document.getElementsByClassName("pause")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const volume = document.getElementsByClassName("volume")[0];
const on = document.getElementsByClassName("on")[0];
const off = document.getElementsByClassName("off")[0];

const timerContainer = document.getElementsByClassName("timerContainer")[0];
const taskbar = document.getElementsByClassName("taskbar")[0];
const menuContainer = document.getElementsByClassName("menuContainer")[0];
const optionsContainer = document.getElementsByClassName("optionsContainer")[0];
const tutorialContainer =
  document.getElementsByClassName("tutorialContainer")[0];
const aboutContainer = document.getElementsByClassName("aboutContainer")[0];
const playBtn = document.getElementsByClassName("playBtn")[0];
const optionsBtn = document.getElementsByClassName("optionsBtn")[0];
const tutorialBtn = document.getElementsByClassName("tutorialBtn")[0];
const aboutBtn = document.getElementsByClassName("aboutBtn")[0];

const sizeOption = document.getElementById("size");
const sizeValue = document.getElementById("sizeValue");
const difficultyOption = document.getElementById("difficulty");
const difficultyValue = document.getElementById("difficultyValue");
const backToMenuBtns = document.getElementsByClassName("backToMenuBtn");

const pauseContainer = document.getElementsByClassName("pauseContainer")[0];
const recordContainer = document.getElementsByClassName("recordContainer")[0];
const recordContainerIcon = document.getElementsByClassName(
  "recordContainer__icon"
)[0];
const recordContainerTitle = document.getElementsByClassName(
  "recordContainer__title"
)[0];
const recordContainerSizeValue = document.getElementsByClassName(
  "recordContainer__sizeValue"
)[0];
const recordContainerDifficultyValue = document.getElementsByClassName(
  "recordContainer__difficultyValue"
)[0];
const recordContainerTimeValue = document.getElementsByClassName(
  "recordContainer__timeValue"
)[0];
const playAgainBtn = document.getElementsByClassName("playAgainBtn")[0];

let gameStart = false;
let timerFlag = false;
const timer = document.getElementsByClassName("timer__value")[0];
const disableBlocks = document.getElementsByClassName(
  "disableBlocks__value"
)[0];
const maxLevelBlock = document.getElementsByClassName(
  "maxLevelBlock__value"
)[0];
