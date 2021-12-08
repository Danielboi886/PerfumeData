import { projectionsList, fetchPoemByVibes, deTangle } from "./handler.js";
import { restartListener } from "./listener.js";
export const startPage = () => {
  setBackGroundPicture();
  questionPrompt();
  moodGrid();
  reservoirs();
  deselectAllButton();
  ShowRecommendations();
};

export const showNextPageDomElement = () => {
  perfumeGrid();
  populatePoemsOnDom();
  restartTheGame();
  restartListener();
};

export const setBackGroundPicture = () => {
  let i = Math.floor(4 * Math.random()) + 1;
  document.body.style.backgroundImage = `url('./src/homepage${i}.jpg')`;
};

export const questionPrompt = () => {
  const hero = document.createElement("div");
  hero.setAttribute("id", "hero");
  let i = Math.floor(3 * Math.random()) + 1;
  hero.style.backgroundImage = `url('./src/hero${i}.jpg')`;
  const feelingQuestion = document.createElement("h1");
  feelingQuestion.setAttribute("id", "feeling_question");
  feelingQuestion.textContent = "Pick a vibe and I will give you a poem!";
  document.body.appendChild(hero);
  hero.appendChild(feelingQuestion);
};
export const moodGrid = () => {
  const moodContainer = document.createElement("div");
  moodContainer.className = "mood_container";
  document.body.appendChild(moodContainer);

  for (let i = 0; i < projectionsList().length; i++) {
    const moodItem = document.createElement("div");
    moodItem.className = "mood_item";
    document.getElementsByClassName("mood_container")[0].appendChild(moodItem);
  }
  const moodItem = document.getElementsByClassName("mood_item");
  for (let i = 0; i < moodItem.length; i++) {
    moodItem.item(i).textContent = projectionsList()[i];
  }
};

export const reservoirs = () => {
  const reservoirs = document.createElement("div");
  reservoirs.setAttribute("id", "reservoirs");
  document.body.appendChild(reservoirs);
  reservoirs.style.display = "none";
};

export const deselectAllButton = () => {
  const hero = document.getElementById("hero");
  const deselectBtn = document.createElement("button");
  deselectBtn.textContent = "Reselect Vibes";
  deselectBtn.setAttribute("id", "deselect");
  hero.appendChild(deselectBtn);
};

export const ShowRecommendations = () => {
  const hero = document.getElementById("hero");
  const showMe = document.createElement("button");
  showMe.textContent = "Show me the recommendations";
  showMe.setAttribute("id", "show_btn");
  hero.appendChild(showMe);
};

export const perfumeGrid = () => {
  const perfumeGrid = document.createElement("div");
  perfumeGrid.setAttribute("id", "perfume_container");
  document.body.appendChild(perfumeGrid);
};

export async function populatePoemsOnDom() {
  const poemItem = document.createElement("div");
  const perfumeGrid = document.getElementById("perfume_container");
  perfumeGrid.appendChild(poemItem);
  const poemTitle = document.createElement("h3");
  poemTitle.className = "poem_title";
  poemItem.appendChild(poemTitle);
  const poemContent = document.createElement("p");
  poemContent.className = "poem_content";
  poemItem.appendChild(poemContent);
  try {
    const result = await fetchPoemByVibes();
    if (result.reason == "Not found") {
      poemItem.textContent =
        "Sorry! No results available by the you vibe you provided!";
    } else {
      const resultLength = result.length;
      result.forEach((poem) => {
        deTangle(poem, resultLength);
      });
    }
  } catch (error) {
    return error;
  }
}

export const restartTheGame = () => {
  const deselectBtn = document.createElement("button");
  deselectBtn.textContent = "Start a New Choice";
  deselectBtn.setAttribute("id", "restart");
  document.getElementById("perfume_container").appendChild(deselectBtn);
};
