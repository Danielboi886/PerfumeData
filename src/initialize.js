import { startPage } from "./view.js";
import {
  selectedVibeListener,
  deselectAllVibesListener,
  showRecommendationsOnNextPage,
} from "./listener.js";

const welcome = () => {
  startPage();
  selectedVibeListener();
  deselectAllVibesListener();
  showRecommendationsOnNextPage();
};

window.addEventListener("load", welcome);
