import "./styles/style.css";
import { TodoApp } from "./modules/app.js";
import { Storage } from "./modules/storage.js";
import { Todo } from "./modules/todo.js";

let app;

if (Storage.hasData()) {
  app = Storage.loadApp();
  console.log("App loaded from localStorage");
} else {
  app = new TodoApp();

  // Test: create a todo
  const currentProject = app.getCurrentProject();
  const todo1 = new Todo(
    "Learn Javascript",
    "Complete The Odin Project",
    "2026-02-28",
    "high",
    "Focus on factory functions and modules",
  );

  // Test: add checklist items
  todo1.addChecklistItem("Read about factory functions");
  todo1.addChecklistItem("Practice with examples");

  Storage.saveApp(app);
}

window.app = app;
window.Storage = Storage;
