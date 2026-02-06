export class Todo {
  constructor(
    title,
    description = '',
    dueDate = '',
    priority = 'medium',
    notes = '',
  ) {
    this.id =
      Date.now().toString() + Math.random().toString(36).substring(2, 9);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.isComplete = false;
    this.checklist = [];
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  addChecklistItem(itemText) {
    this.checklist.push({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      text: itemText,
      isComplete: false,
    });
  }

  removeChecklistItem(itemId) {
    this.checklist = this.checklist.filter((item) => item.id !== itemId);
  }

  toggleChecklistItem(itemId) {
    const item = this.checklist.find((item) => item.id === itemId);
    if (item) item.isComplete = !item.isComplete;
  }

  updateTodo(updates) {
    if (updates.title !== undefined && updates.title !== null)
      this.title = updates.title;
    if (updates.description !== undefined && updates.description !== null)
      this.description = updates.description;
    if (updates.dueDate !== undefined && updates.dueDate !== null)
      this.dueDate = updates.dueDate;
    if (updates.priority !== undefined && updates.priority !== null)
      this.priority = updates.priority;
    if (updates.notes !== undefined && updates.notes !== null)
      this.notes = updates.notes;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      notes: this.notes,
      isComplete: this.isComplete,
      checklist: this.checklist,
    };
  }

  static fromJSON(data) {
    const todo = new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.notes,
    );
    todo.id = data.id;
    todo.isComplete = data.isComplete;
    todo.checklist = data.checklist || [];
    return todo;
  }
}
