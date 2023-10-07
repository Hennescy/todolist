import { saveTasksToLocalStorage, getTasksFromLocalStorage } from "./localStorageManager";


class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }
  }


class TaskManager {
  constructor() {
    this.tasks = getTasksFromLocalStorage();
  }

  addTask(title, description, dueDate, priority) {
      const task = new Task(title, description, dueDate, priority);
      this.tasks.push(task);
      this.saveTasksToLocalStorage();
  }

  getTasks() {
      return this.tasks;
  }

  getTask(index) {
      return this.tasks[index];
  }

  editTask(index, updatedData) {
      Object.assign(this.tasks[index], updatedData);
      this.saveTasksToLocalStorage();
  }

  removeTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasksToLocalStorage();
  }

  markAsComplete(index) {
      this.tasks[index].completed = true;
      this.saveTasksToLocalStorage();
  }

  saveTasksToLocalStorage() {
    saveTasksToLocalStorage(this.tasks);
}
}

  

export { TaskManager };
