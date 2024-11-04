let isEditMode = false;
const links = [];
const mainList = null;
let addNewLinkElement = null;

function initialize() {
    edit = document.getElementById('edit');
    edit.addEventListener('click', toggleEditMode);

    addNewLinkElement = document.querySelector('#addNewLink');
    addNewLinkElement.style.display = "none";
    addNewLinkElement.addEventListener('click', addNewLink);

    const mainList = document.getElementById('main-list');


    links.push(new ListItem("youtube", "https://www.youtube.com/"));
    links.push(new ListItem("github", "https://github.com/lukajk1"));

}
function toggleEditMode() {
    isEditMode = !isEditMode;
    if (isEditMode) {
        edit.textContent = '[save]';
    }
    else {
        edit.textContent = '[edit]';
    }

    links.forEach(item => {
        item.setEditMode(isEditMode); 
    });

    addNewLinkElement.style.display = isEditMode ? "block" : "none";
}

function addNewLink() {
    links.push(new ListItem("", ""));
    links[links.length - 1].setEditMode(true);
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});
