import './styles/style.css';
import { TodoApp } from './modules/app.js';
import { Storage } from './modules/storage.js';
import { DOMManager } from './modules/dom.js';

document.addEventListener('DOMContentLoaded', () => {
  let app;

  if (Storage.hasData()) {
    app = Storage.loadApp();
  } else {
    app = new TodoApp();
    Storage.saveApp(app);
  }

  const domManager = new DOMManager(app);

  window.app = app;
  window.domManager = domManager;
});
