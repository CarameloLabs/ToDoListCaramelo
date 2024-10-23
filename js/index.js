// index.js
import { loadFolders, saveFolders } from './storage.js';
import { addFolder, renderFolders, selectFolder, editFolder, deleteFolder } from './folders.js';
import { addTask, renderTasks, editTask, deleteTask } from './tasks.js';
import { drag, drop } from './dragAndDrop.js';

// Inicializando as funções ao carregar a página
window.onload = loadFolders;

// Atribuir os eventos de clique aos botões
document.getElementById('addFolderButton').onclick = addFolder;
document.getElementById('addTaskButton').onclick = addTask;

// Tornar funções disponíveis globalmente para o HTML
window.selectFolder = selectFolder;
window.editFolder = editFolder;
window.deleteFolder = deleteFolder;
window.editTask = editTask;
window.deleteTask = deleteTask;
