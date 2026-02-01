import { Project } from "./project.js";

export class TodoApp {
  constructor() {
    this.projects = [];
    this.currentProjectId = null;

    this.addProject("Default");
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);

    if (this.projects.length === 1) {
      this.currentProjectId = project.id;
    }

    return project;
  }

  removeProject(projectId) {
    if (this.projects.length === 1) return false;

    this.projects = this.projects.filter((project) => project.id !== projectId);

    if (this.currentProjectId === projectId) {
      this.currentProjectId = this.projects[0].id;
    }

    return true;
  }

  getProject(projectId) {
    return this.projects.find((project) => project.id == projectId);
  }

  getCurrentProject() {
    return this.getProject(this.currentProjectId);
  }

  setCurrentProject(projectId) {
    const project = this.getProject(projectId);
    if (project) {
      this.currentProjectId = projectId;
      return true;
    }
    return false;
  }

  toJSON() {
    return {
      projects: this.projects.map((project) => project.toJSON()),
      currentProjectId: this.currentProjectId,
    };
  }

  static fromJSON(data) {
    const app = new TodoApp();
    app.projects = data.projects.map((projectData) =>
      Project.fromJSON(projectData),
    );
    app.currentProjectId = data.currentProjectId;
    return app;
  }
}
