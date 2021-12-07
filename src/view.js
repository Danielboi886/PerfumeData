import { projectionsList } from "./handler.js";

export const startPage = () => {
  questionPrompt();
  moodGrid();
  reservoirs();
  deselectAllButton();
  ShowRecommendations();
};

export const showNextPageDomElement = () => {
  perfumeGrid();
};

export const questionPrompt = () => {
  const feelingQuestion = document.createElement("h1");
  feelingQuestion.setAttribute("id", "feeling_question");
  feelingQuestion.textContent =
    "What vibe do you want to choose for your perfume?";
  document.body.appendChild(feelingQuestion);
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
    moodItem.item(i).style.backgroundColor = "grey";
    moodItem.item(i).style.padding = "20px";
    moodItem.item(i).style.margin = "10px";
    moodItem.item(i).style.display = "flex";
    moodItem.item(i).textContent = projectionsList()[i];
  }
};

export const reservoirs = () => {
  const reservoirs = document.createElement("div");
  reservoirs.setAttribute("id", "reservoirs");
  document.body.appendChild(reservoirs);
};

export const deselectAllButton = () => {
  const deselectBtn = document.createElement("button");
  deselectBtn.textContent = "Reselect Vibes";
  deselectBtn.setAttribute("id", "deselect");
  document.body.appendChild(deselectBtn);
};

export const ShowRecommendations = () => {
  const showMe = document.createElement("button");
  showMe.textContent = "Show me the recommendations";
  showMe.setAttribute("id", "show_btn");
  document.body.appendChild(showMe);
};

export const perfumeGrid = () => {
  const perfumeGrid = document.createElement("div");
  perfumeGrid.setAttribute("id", "perfume_container");
  perfumeGrid.style.padding = "500px";
  perfumeGrid.style.backgroundColor = "grey";
  document.body.appendChild(perfumeGrid);
};
