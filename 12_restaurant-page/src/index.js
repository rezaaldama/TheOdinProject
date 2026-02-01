import createHomePage from "./home.js";
import createMenuPage from "./menu.js";

// Load home page by default
createHomePage();

// Get navigation buttons
const homeBtn = document.getElementById("about-btn");
const menuBtn = document.getElementById("menu-btn");

// Add event listeners for tab switching
homeBtn.addEventListener("click", () => {
  content.innerHTML = ""; // Clear existing content

  createHomePage();
});

menuBtn.addEventListener("click", () => {
  content.innerHTML = ""; // Clear existing content

  createMenuPage();
});
