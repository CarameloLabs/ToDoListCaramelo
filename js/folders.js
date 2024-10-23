// folders.js
import { saveFolders } from './storage.js';
import { renderTasks } from './tasks.js';
import { drag, drop } from './dragAndDrop.js';

export function addFolder() {
    const folderInput = document.getElementById('folderInput');
    const folderName = folderInput.value.trim();
    if (folderName) {
        folders.push({ name: folderName, tasks: [] });
        folderInput.value = '';
        saveFolders();
        renderFolders();
    }
}

export function renderFolders() {
    const foldersDiv = document.getElementById('folders');
    foldersDiv.innerHTML = '';

    folders.forEach((folder, index) => {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';
        
        folderDiv.innerHTML = `
            <span style="margin-left:5px" class="drag-handle">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="2" fill="currentColor"/>
                    <rect x="2" y="11" width="20" height="2" fill="currentColor"/>
                    <rect x="2" y="16" width="20" height="2" fill="currentColor"/>
                </svg>
            </span>
            
            <div onclick="window.selectFolder(${index})" style="width:52%;height:100%;padding:0px;margin-top:20px;margin-bottom:20px" >
            <span style="cursor: pointer;">${folder.name}</span>
            </div>
            <div style="margin-right:5px">
                <button onclick="window.editFolder(${index})">Editar</button> 
                <button onclick="window.deleteFolder(${index})">Excluir</button>
            </div>
        `;

        folderDiv.setAttribute('draggable', true);
        folderDiv.ondragstart = (e) => drag(e, index);
        folderDiv.ondrop = (e) => drop(e, index);

        foldersDiv.appendChild(folderDiv);
    });
}
