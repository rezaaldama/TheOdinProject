import { TodoApp } from "./app.js";

export class Storage {
  static STORAGE_KEY = "todoAppData";

  static saveApp(app) {
    try {
      const data = JSON.stringify(app.toJSON());
      localStorage.setItem(this.STORAGE_KEY, data);
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  }

  static loadApp() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);

      if (!data) return null;

      const parsedData = JSON.parse(data);
      return TodoApp.fromJSON(parsedData);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return null;
    }
  }

  static clearApp() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      return false;
    }
  }

  static hasData() {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
