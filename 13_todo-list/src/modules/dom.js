import { projectManager, createTodo } from "./todoLogic.js";

export const renderProjects = () => {
  const sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = ""; // Clear old list

  Object.keys(projectManager.projects).forEach((projectName) => {
    const btn = document.createElement("button");
    btn.textContent = projectName;
    btn.onclick = () => renderTodos(projectName);
    sidebar.appendChild(btn);
  });
};

const renderTodos = (projectName) => {
  const container = document.querySelector("#todo-container");
  container.innerHTML = `<h2>${projectName}</h2>`;
  // ... logic to loop through todos and create HTML elements
};
