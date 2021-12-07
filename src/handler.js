import { perfumeData } from "./data.js";
//import { deselectAllVibesListener } from "./listener.js";
//const reservoirs = document.getElementById("reservoirs");

export const projectionsList = () => {
  let impressions = perfumeData.impressions;
  let projectionsArray = [];

  impressions.forEach((impression) => {
    const { projections } = impression;
    projectionsArray = projectionsArray.concat(projections);
  });
  return projectionsArray;
};
let selectedVibeArray = [];

export const vibeClickHandler = (evt) => {
  let vibe = [];
  let vibeName = evt.target.textContent;
  vibe[vibe.length] = vibeName;
  selectedVibeArray = selectedVibeArray.concat(vibe);
  logSelectedArray(selectedVibeArray);
};
const logSelectedArray = (array) => {
  const reservoirs = document.getElementById("reservoirs");
  reservoirs.textContent = String(array);
};

export const deselectAllVibesHandler = () => {
  const reservoirs = document.getElementById("reservoirs");
  reservoirs.textContent = "";
  location.reload();
};

export const clearFirstPageDomElement = () => {
  const reservoirs = document.getElementById("reservoirs");
  const vibeContainer = document.getElementsByClassName("mood_container")[0];
  const resetBtn = document.getElementById("deselect");
  const question = document.getElementById("feeling_question");
  const showBtn = document.getElementById("show_btn");
  reservoirs.style.display = "none";
  vibeContainer.style.display = "none";
  resetBtn.style.display = "none";
  question.style.display = "none";
  showBtn.style.display = "none";
};
