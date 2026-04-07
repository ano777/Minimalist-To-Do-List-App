// DOM Elements
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggleBtn = document.getElementById('theme-toggle');

// Initialize State from Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'All';

// Apply saved theme preference on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.innerText = '☀️ Light';
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleBtn.innerText = isDark ? '☀️ Light' : '🌙 Dark';
});

// Task Management Functions
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: Date.now(),
        text: text,
        priority: prioritySelect.value,
        completed: false
    });
    
    taskInput.value = '';
    saveAndRender();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    saveAndRender();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit your task:", task.text);
    if (newText && newText.trim()) {
        task.text = newText.trim();
        saveAndRender();
    }
}

// Utility & Rendering
function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';

    let displayTasks = [...tasks].sort((a, b) => a.completed - b.completed);

    
    if (currentFilter === 'Pending') displayTasks = displayTasks.filter(t => !t.completed);
    if (currentFilter === 'Completed') displayTasks = displayTasks.filter(t => t.completed);

    // Generate DOM elements
    displayTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="task-info">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${task.id})">
                <span class="task-text">${task.text}</span>
                <span class="priority-badge priority-${task.priority}">${task.priority}</span>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

renderTasks();