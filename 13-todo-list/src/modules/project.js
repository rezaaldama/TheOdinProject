import { Todo } from "./todo.js";

export class Project {
  constructor(name) {
    this.id =
      Date.now().toString() + Math.random().toString(36).substring(2, 9);
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  removeTodo(todoId) {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  getTodo(todoId) {
    return this.todos.find((todo) => todo.id === todoId);
  }

  updateProjectName(newName) {
    this.name = newName;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      todos: this.todos.map((todo) => todo.toJSON()),
    };
  }

  static fromJSON(data) {
    const project = new Project(data.name);
    project.id = data.id;
    project.todos = data.todos.map((todoData) => Todo.fromJSON(todoData));
    return project;
  }
}
