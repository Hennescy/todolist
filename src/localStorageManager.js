// Function to save tasks to localStorage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from localStorage
function getTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

export { saveTasksToLocalStorage, getTasksFromLocalStorage };