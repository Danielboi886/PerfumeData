import { perfumeData } from "./data.js";

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
  evt.target.style.backgroundColor = "#38613b";
  evt.target.style.color = "white";
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
  const hero = document.getElementById("hero");
  reservoirs.style.display = "none";
  vibeContainer.style.display = "none";
  resetBtn.style.display = "none";
  question.style.display = "none";
  showBtn.style.display = "none";
  hero.style.display = "none";
};

export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Sorry the connection didn't go through, please try again later! Thanks! ;-)"
    );
  }
  const responseData = await response.json();
  return responseData;
}

export async function fetchPoemByVibes() {
  const reservoirs = document.getElementById("reservoirs");
  const userSelectedVibe = reservoirs.textContent
    .toLowerCase()
    .replace(/,/g, " ");
  const result = await fetchData(
    `https://poetrydb.org/lines/${userSelectedVibe}`
  );
  return result;
}

export const deTangle = (poem, length) => {
  let title = poem.title;
  let lines = poem.lines;
  appendPoems(title, lines, length);
};

export const appendPoems = (title, lines, length) => {
  let contentWithLineBreak = lines.join("<br>");
  let poemTitle = document.getElementsByClassName("poem_title");
  let poemContent = document.getElementsByClassName("poem_content");
  for (let i = 0; i < length; i++) {
    poemTitle.item(i).textContent = title;
    poemContent.item(i).innerHTML = contentWithLineBreak;
  }
};
