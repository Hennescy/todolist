import { TaskManager } from './taskManager.js';

const taskForm = document.getElementById('taskForm');
const taskContainer = document.getElementById('taskContainer');

const taskManager = new TaskManager();
renderTasks();
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    taskManager.addTask(title, description, dueDate, priority);

    taskForm.reset();

    renderTasks();
});

function renderTasks() {
    taskContainer.innerHTML = '';

    taskManager.getTasks().forEach((task, index) => {
        const card = document.createElement('div');
        card.classList.add('task-card');
        if (task.completed) {
            card.classList.add('completed');
        }

        card.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Priority: ${task.priority}</p>
            ${task.completed ? '<p>Completed</p> <button class="remove-btn" data-index="${index}">Remove</button>'
                
                : `
              
                  <button class="edit-btn" data-index="${index}">Edit</button>
                  <button class="remove-btn" data-index="${index}">Remove</button>
                  <button class="complete-btn" data-index="${index}">Mark as Complete</button>
                `
            }
        `;

        taskContainer.appendChild(card);
    });
}

taskContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-btn')) {
        const index = e.target.getAttribute('data-index');
        const task = taskManager.getTask(index);
        const card = renderEditForm(task, index);
        taskContainer.replaceChild(card, taskContainer.childNodes[index]);
    } else if (e.target.classList.contains('remove-btn')) {
        const index = e.target.getAttribute('data-index');
        taskManager.removeTask(index);
        renderTasks();
    } else if (e.target.classList.contains('complete-btn')) {
        const index = e.target.getAttribute('data-index');
        taskManager.markAsComplete(index);
        renderTasks();
    }
});

function renderEditForm(task, index) {
    const card = document.createElement('div');
    card.classList.add('task-card');

    card.innerHTML = `
        <input type="text" id="editTitle" value="${task.title}" required>
        <input type="text" id="editDescription" value="${task.description}">
        <input type="date" id="editDueDate" value="${task.dueDate}" required>
        <select id="editPriority">
            <option value="low" ${task.priority === 'low' ? 'selected' : ''}>Low</option>
            <option value="medium" ${task.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="high" ${task.priority === 'high' ? 'selected' : ''}>High</option>
        </select>
        <button class="save-edit-btn" data-index="${index}">Save</button>
    `;

    return card;
}

taskContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('save-edit-btn')) {
        const index = e.target.getAttribute('data-index');
        const editedTitle = document.getElementById('editTitle').value;
        const editedDescription = document.getElementById('editDescription').value;
        const editedDueDate = document.getElementById('editDueDate').value;
        const editedPriority = document.getElementById('editPriority').value;

        taskManager.editTask(index, {
            title: editedTitle,
            description: editedDescription,
            dueDate: editedDueDate,
            priority: editedPriority
        });

        renderTasks();
    }
});


