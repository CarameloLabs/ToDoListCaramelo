// dragAndDrop.js
import { saveFolders } from './storage.js';

export function drag(e, index) {
    draggedIndex = index;
    e.dataTransfer.setData("text/plain", index);
}

export function drop(e, index) {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
        const movedFolder = folders.splice(draggedIndex, 1)[0];
        folders.splice(index, 0, movedFolder);
        saveFolders();
        renderFolders();
    }
}
