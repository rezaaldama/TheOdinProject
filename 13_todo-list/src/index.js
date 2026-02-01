class Todo {
  constructor(title, description, dueDate, priority, project, notes = "") {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.notes = notes;
    this.checklist = [];
    this.isComplete = false;
    this.createdDate = new Date();
  }

  toggleStatus() {
    this.isComplete = !this.isComplete;
  }
}
