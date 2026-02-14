import { Todo } from './todo.js';
import { Storage } from './storage.js';
import { format } from 'date-fns';

export class DOMManager {
  constructor(app) {
    this.app = app;
    this.currentTodoId = null;
    this.initializeEventListeners();
    this.render();
  }

  initializeEventListeners() {
    const addProjectBtn = document.getElementById('addProjectBtn');
    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', () => {
        this.handleAddProject();
      });
    }

    const addTodoBtn = document.getElementById('addTodoBtn');
    if (addTodoBtn) {
      addTodoBtn.addEventListener('click', () => {
        this.openTodoModal();
      });
    }

    const todoForm = document.getElementById('todoForm');
    if (todoForm) {
      todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleTodoFormSubmit();
      });
    }

    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        this.closeTodoModal();
      });
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.closeTodoModal();
      });
    }

    const todoModal = document.getElementById('todoModal');
    if (todoModal) {
      todoModal.addEventListener('click', (e) => {
        if (e.target.id === 'todoModal') {
          this.closeTodoModal();
        }
      });
    }
  }

  render() {
    this.renderProjects();
    this.renderTodos();
  }

  renderProjects() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    this.app.projects.forEach((project) => {
      const li = document.createElement('li');
      li.className = 'project-item';
      if (project.id === this.app.currentProjectId) {
        li.classList.add('active');
      }

      if (project.name !== 'Default') {
        li.innerHTML = `
          <span class="project-name">${project.name}</span>
          <span class="todo-count">${project.todos.length}</span>
          <button class="delete-project-btn">×</button>
        `;
      } else {
        li.innerHTML = `
          <span class="project-name">${project.name}</span>
          <span class="todo-count">${project.todos.length}</span>
        `;
      }

      li.querySelector('.project-name').addEventListener('click', () => {
        this.app.setCurrentProject(project.id);
        this.save();
        this.render();
      });

      if (project.name !== 'Default') {
        const deleteBtn = li.querySelector('.delete-project-btn');
        if (deleteBtn) {
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Delete project "${project.name}"?`)) {
              this.app.removeProject(project.id);
              this.save();
              this.render();
            }
          });
        }
      }

      projectList.appendChild(li);
    });
  }

  renderTodos() {
    const currentProject = this.app.getCurrentProject();
    const todoList = document.getElementById('todoList');
    const projectTitle = document.getElementById('projectTitle');

    projectTitle.textContent = currentProject.name;
    todoList.innerHTML = '';

    if (currentProject.todos.length === 0) {
      todoList.innerHTML =
        '<p class="empty-state">No todos yet. Click "+ New Todo" to add one!</p>';
      return;
    }

    currentProject.todos.forEach((todo) => {
      const todoCard = this.createTodoCard(todo);
      todoList.appendChild(todoCard);
    });
  }

  createTodoCard(todo) {
    const card = document.createElement('div');
    card.className = `todo-card priority-${todo.priority}`;
    if (todo.isComplete) {
      card.classList.add('completed');
    }

    let dueDateText = '';
    if (todo.dueDate) {
      try {
        dueDateText = format(new Date(todo.dueDate), 'MMM dd, yyyy');
      } catch (e) {
        dueDateText = todo.dueDate;
      }
    }

    card.innerHTML = `
      <div class="todo-header">
        <input type="checkbox" class="todo-checkbox" ${todo.isComplete ? 'checked' : ''}>
        <h3 class="todo-title">${todo.title}</h3>
        <span class="todo-priority">${todo.priority}</span>
      </div>
      <div class="todo-body ${todo.isComplete ? 'hidden' : ''}">
        ${todo.description ? `<p class="todo-description">${todo.description}</p>` : ''}
        ${todo.dueDate ? `<p class="todo-due-date">📅 ${dueDateText}</p>` : ''}
        ${todo.checklist.length > 0 ? this.createChecklistHTML(todo.checklist) : ''}
      </div>
      <div class="todo-actions">
        <button class="btn-expand">${todo.isComplete ? 'Expand' : 'Details'}</button>
        <button class="btn-edit">Edit</button>
        <button class="btn-delete">Delete</button>
      </div>
    `;

    const checkbox = card.querySelector('.todo-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        todo.toggleComplete();
        this.save();
        this.render();
      });
    }

    const expandBtn = card.querySelector('.btn-expand');
    if (expandBtn) {
      expandBtn.addEventListener('click', () => {
        const body = card.querySelector('.todo-body');
        body.classList.toggle('hidden');
      });
    }

    const editBtn = card.querySelector('.btn-edit');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        this.openTodoModal(todo);
      });
    }

    const deleteBtn = card.querySelector('.btn-delete');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Delete "${todo.title}"?`)) {
          const currentProject = this.app.getCurrentProject();
          currentProject.removeTodo(todo.id);
          this.save();
          this.render();
        }
      });
    }

    return card;
  }

  createChecklistHTML(checklist) {
    return `
      <ul class="checklist">
        ${checklist
          .map(
            (item) => `
          <li class="${item.isComplete ? 'completed' : ''}">
            <input type="checkbox" ${item.isComplete ? 'checked' : ''} disabled>
            <span>${item.text}</span>
          </li>
        `,
          )
          .join('')}
      </ul>
    `;
  }

  handleAddProject() {
    const name = prompt('Enter project name:');
    if (name && name.trim()) {
      this.app.addProject(name.trim());
      this.save();
      this.render();
    }
  }

  openTodoModal(todo = null) {
    const modal = document.getElementById('todoModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('todoForm');

    form.reset();

    if (todo) {
      modalTitle.textContent = 'Edit Todo';
      this.currentTodoId = todo.id;
      document.getElementById('todoTitle').value = todo.title;
      document.getElementById('todoDescription').value = todo.description;
      document.getElementById('todoDueDate').value = todo.dueDate;
      document.getElementById('todoPriority').value = todo.priority;
      document.getElementById('todoNotes').value = todo.notes;
    } else {
      modalTitle.textContent = 'Add New Todo';
      this.currentTodoId = null;
    }

    modal.classList.add('active');
  }

  closeTodoModal() {
    const modal = document.getElementById('todoModal');
    modal.classList.remove('active');
    this.currentTodoId = null;
  }

  handleTodoFormSubmit() {
    const title = document.getElementById('todoTitle').value.trim();
    const description = document.getElementById('todoDescription').value.trim();
    const dueDate = document.getElementById('todoDueDate').value;
    const priority = document.getElementById('todoPriority').value;
    const notes = document.getElementById('todoNotes').value.trim();

    const currentProject = this.app.getCurrentProject();

    if (this.currentTodoId) {
      // Edit existing todo
      const todo = currentProject.getTodo(this.currentTodoId);
      if (todo) {
        todo.updateTodo({ title, description, dueDate, priority, notes });
      }
    } else {
      // Create new todo
      const newTodo = new Todo(title, description, dueDate, priority, notes);
      currentProject.addTodo(newTodo);
    }

    this.closeTodoModal();
    this.save();
    this.render();
  }

  save() {
    Storage.saveApp(this.app);
  }
}
