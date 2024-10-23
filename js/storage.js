// storage.js

let folders = [];
let selectedFolderIndex = null;

// Carregar pastas do localStorage ao iniciar
export function loadFolders() {
    const storedFolders = localStorage.getItem('folders');
    if (storedFolders) {
        folders = JSON.parse(storedFolders);
        renderFolders();
    }
}

// Salvar pastas no localStorage
export function saveFolders() {
    localStorage.setItem('folders', JSON.stringify(folders));
}
