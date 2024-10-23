let folders = [];
let selectedFolderIndex = null;
let draggedIndex = null;

// Carregar pastas do localStorage ao iniciar
function loadFolders() {
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
        folders = JSON.parse(storedFolders);
        renderFolders();
    }
}

// Salvar pastas no localStorage
function saveFolders() {
    localStorage.setItem('folders', JSON.stringify(folders));
}

function addFolder() {
    const folderblock = document.getElementById("folderInput").style.display;
    
    if(folderblock === "block"){
        document.getElementById("folderInput").style.display = "none"
    }else {
        document.getElementById("folderInput").style.display = "block"
    }

    const folderInput = document.getElementById('folderInput');
    const folderName = folderInput.value.trim();
    if (folderName) {
        folders.push({ name: folderName, tasks: [] });
        folderInput.value = '';
        saveFolders(); // Salva após adicionar a pasta
        renderFolders();
    }
}

function renderFolders() {
    const foldersDiv = document.getElementById('folders');
    foldersDiv.innerHTML = '';

    folders.forEach((folder, index) => {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';
        
        // Definindo o conteúdo HTML da pasta
        folderDiv.innerHTML = `
        <div class="folderDiv">
            <div style="display: flex; align-items: center;">
                <span style="margin-left:5px" class="drag-handle">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="6" width="20" height="2" fill="currentColor"/>
                        <rect x="2" y="11" width="20" height="2" fill="currentColor"/>
                        <rect x="2" y="16" width="20" height="2" fill="currentColor"/>
                    </svg>
                </span>
            
                <div onclick="selectFolder(${index})" style="flex-grow: 1; padding:0px; margin-top:20px; margin-bottom:20px;">
                    <span style="cursor: pointer;">${folder.name}</span>
                </div>
            </div>
    
            <div class="btnFolder" style="display: none; margin-left: auto;justify-self: flex-end;">
                <button onclick="editFolder(${index})">Editar</button> 
                <button onclick="deleteFolder(${index})">Excluir</button>
            </div>
        </div>
    `;
    
        
        folderDiv.setAttribute('draggable', true);
        
        // Eventos para arrastar e soltar
        folderDiv.ondragstart = (e) => drag(e, index);
        folderDiv.ondragover = (e) => e.preventDefault();
        folderDiv.ondrop = (e) => drop(e, index);

        // Eventos para toque
        folderDiv.ontouchstart = (e) => touchStart(e, index);
        folderDiv.ontouchmove = (e) => touchMove(e);
        folderDiv.ontouchend = (e) => touchEnd(e, index);

        foldersDiv.appendChild(folderDiv);
    });
}

function showbtnFolder() {
    const elements = document.querySelectorAll('.btnFolder'); // Seleciona todos os elementos com a classe
    const folderDiv = document.querySelectorAll('.folderDiv'); // Seleciona todos os elementos com a classe

    elements.forEach(element => {
        const displayStyle = window.getComputedStyle(element).display;

        if (displayStyle === "block") {
            element.style.display = "none"; // Esconde o elemento
            folderDiv.forEach(element2 => {
                element2.style.width = "0"; // Esconde o elemento
            })
        } else {
            element.style.display = "block"; // Mostra o elemento
            folderDiv.forEach(element2 => {
                element2.style.width = "100%"; // Esconde o elemento
            })
        }
    });
}

function selectFolder(index) {
    selectedFolderIndex = index;
    renderTasks(folders[index].tasks);
    document.getElementById('folder-create').style.display = 'none'; // Oculta as pastas
    document.getElementById('folders').style.display = 'none'; // Oculta as pastas
    document.getElementById('folder-btn').style.display = 'none'; // Oculta as pastas
    document.getElementById('tasks-container').style.display = 'block'; // Mostra as tarefas
    document.getElementById('addTaskButton').disabled = false;
}

function goBack() {
    selectedFolderIndex = null; // Reseta a pasta selecionada
    document.getElementById('tasks-container').style.display = 'none'; // Oculta as tarefas
    document.getElementById('folders').style.display = 'block'; // Mostra as pastas novamente
    document.getElementById('folder-btn').style.display = 'block'; // Oculta as pastas
    document.getElementById('folder-create').style.display = 'flex'; // Oculta as pastas
    document.getElementById("taskInput").style.display = "none"
}

function editFolder(index) {
    const newFolderName = prompt("Editar o nome da pasta:", folders[index].name);
    if (newFolderName) {
        folders[index].name = newFolderName;
        saveFolders(); // Salva após editar a pasta
        renderFolders();
    }
}

function deleteFolder(index) {
    if (confirm("Tem certeza que deseja excluir esta pasta? Todas as tarefas nela serão perdidas.")) {
        // Remove a pasta e suas tarefas
        folders.splice(index, 1);
        saveFolders(); // Salva após excluir a pasta

        // Resetar a seleção da pasta
        selectedFolderIndex = null;

        // Atualiza a visualização
        renderFolders(); // Atualiza a lista de pastas
        document.getElementById('tasks-container').style.display = 'none'; // Oculta a seção de tarefas
        document.getElementById('folders').style.display = 'block'; // Garante que as pastas estão visíveis
    }
}

function drag(e, index) {
    draggedIndex = index;
    e.dataTransfer.setData("text/plain", index);
}

function drop(e, index) {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
        const movedFolder = folders.splice(draggedIndex, 1)[0];
        folders.splice(index, 0, movedFolder);
        saveFolders(); // Salva a nova ordem
        renderFolders();
    }
}

function touchStart(e, index) {
    draggedIndex = index;
    e.target.style.opacity = "0.5"; // Indica que a pasta está sendo arrastada
}

function touchMove(e) {
    // Prevent default behavior to enable custom touch handling
    e.preventDefault();
}

function touchEnd(e, index) {
    const targetIndex = index;
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
        const movedFolder = folders.splice(draggedIndex, 1)[0];
        folders.splice(targetIndex, 0, movedFolder);
        saveFolders(); // Salva a nova ordem
        renderFolders();
    }
    // Reset the opacity after dragging
    e.target.style.opacity = "1";
    draggedIndex = null;
}

function addTask() {
    const taskblock = document.getElementById("taskInput").style.display;
    console.log(taskblock);
    
    if(taskblock === "block"){
        document.getElementById("taskInput").style.display = "none"
    }else {
        document.getElementById("taskInput").style.display = "block"
    }

    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName && selectedFolderIndex !== null) {
        folders[selectedFolderIndex].tasks.push(taskName);
        taskInput.value = '';
        saveFolders(); // Salva após adicionar a tarefa
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}

function renderTasks(tasks) {
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';

    tasks.forEach((task, taskIndex) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
        <div class="TaskDiv">
            <div style="display: flex; align-items: center;">
                <button id="toggleButton" class="round-button" onclick="toggleButton(this)"></button>
                <span>${task}</span> 
            </div>
            <div class="btnTask" style="display: none; margin-left: auto;justify-self: flex-end;">
                <button onclick="editTask(${taskIndex})">Editar</button>
                <button onclick="deleteTask(${taskIndex})">Excluir</button>
            </div>
        </div>
        `;
        taskDiv.setAttribute('draggable', true);

        // Eventos para arrastar e soltar tarefas
        taskDiv.ondragstart = (e) => taskDrag(e, taskIndex);
        taskDiv.ondragover = (e) => e.preventDefault();
        taskDiv.ondrop = (e) => taskDrop(e, taskIndex);

        // Eventos para toque nas tarefas
        taskDiv.ontouchstart = (e) => taskTouchStart(e, taskIndex);
        taskDiv.ontouchmove = (e) => taskTouchMove(e);
        taskDiv.ontouchend = (e) => taskTouchEnd(e, taskIndex);

        tasksDiv.appendChild(taskDiv);
    });
}

function showbtnTask() {
    const elements = document.querySelectorAll('.btnTask'); // Seleciona todos os elementos com a classe
    const taskDiv = document.querySelectorAll('.TaskDiv'); // Seleciona todos os elementos com a classe

    elements.forEach(element => {
        const displayStyle = window.getComputedStyle(element).display;

        if (displayStyle === "block") {
            element.style.display = "none"; // Esconde o elemento
            taskDiv.forEach(element2 => {
                element2.style.width = "0"; // Esconde o elemento
            })
        } else {
            element.style.display = "block"; // Mostra o elemento
            taskDiv.forEach(element2 => {
                element2.style.width = "100%"; // Esconde o elemento
            })
        }
    });
}

function taskDrag(e, taskIndex) {
    e.dataTransfer.setData("text/plain", taskIndex);
}

function taskDrop(e, targetIndex) {
    e.preventDefault();
    const draggedTaskIndex = e.dataTransfer.getData("text/plain");
    if (draggedTaskIndex !== targetIndex) {
        const movedTask = folders[selectedFolderIndex].tasks.splice(draggedTaskIndex, 1)[0];
        folders[selectedFolderIndex].tasks.splice(targetIndex, 0, movedTask);
        saveFolders(); // Salva a nova ordem
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}

function taskTouchStart(e, taskIndex) {
    draggedIndex = taskIndex;
    e.target.style.opacity = "0.5"; // Indica que a tarefa está sendo arrastada
}

function taskTouchMove(e) {
    // Prevent default behavior to enable custom touch handling
    e.preventDefault();
}

function taskTouchEnd(e, targetIndex) {
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
        const movedTask = folders[selectedFolderIndex].tasks.splice(draggedIndex, 1)[0];
        folders[selectedFolderIndex].tasks.splice(targetIndex, 0, movedTask);
        saveFolders(); // Salva a nova ordem
        renderTasks(folders[selectedFolderIndex].tasks);
    }
    // Reset the opacity after dragging
    e.target.style.opacity = "1";
    draggedIndex = null;
}

function editTask(taskIndex) {
    const newTaskName = prompt("Editar a tarefa:", folders[selectedFolderIndex].tasks[taskIndex]);
    if (newTaskName) {
        folders[selectedFolderIndex].tasks[taskIndex] = newTaskName;
        saveFolders(); // Salva após editar a tarefa
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}

function deleteTask(taskIndex) {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
        folders[selectedFolderIndex].tasks.splice(taskIndex, 1);
        saveFolders(); // Salva após excluir a tarefa
        renderTasks(folders[selectedFolderIndex].tasks);
    }
}

function toggleButton(button) {
    button.classList.toggle('filled'); // Alterna a classe 'filled'
}


// Carregar pastas quando a página for carregada
window.onload = loadFolders;
