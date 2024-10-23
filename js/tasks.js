// tasks.js
import { saveFolders } from './storage.js';

export function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName && selectedFolderIndex !== null) {
        folders[selectedFolderIndex].tasks.push(taskName);
        taskInput.value = '';
        saveFolders();
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}

export function renderTasks(tasks) {
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';

    tasks.forEach((task, taskIndex) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            ${task} <div><button onclick="editTask(${taskIndex})">Editar</button> <button onclick="deleteTask(${taskIndex})">Excluir</button></div>
        `;

        taskDiv.setAttribute('draggable', true);

        tasksDiv.appendChild(taskDiv);
    });
}

export function editTask(taskIndex) {
    const newTaskName = prompt("Editar a tarefa:", folders[selectedFolderIndex].tasks[taskIndex]);
    if (newTaskName) {
        folders[selectedFolderIndex].tasks[taskIndex] = newTaskName;
        saveFolders();
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}

export function deleteTask(taskIndex) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        folders[selectedFolderIndex].tasks.splice(taskIndex, 1);
        saveFolders();
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}
