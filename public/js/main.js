let isEditMode = false;
const links = [];
let addNewLinkElement = null;

function initialize() {
    const edit = document.getElementById('edit');
    edit.addEventListener('click', toggleEditMode);

    addNewLinkElement = document.querySelector('#addNewLink');
    addNewLinkElement.style.display = "none";
    addNewLinkElement.addEventListener('click', addNewLink);

    const mainList = document.getElementById('main-list');

    serverLoadLinks();

    //links.push(new ListItem("youtube", "https://www.youtube.com/"));
    //links.push(new ListItem("github", "https://github.com/lukajk1"));
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    const edit = document.getElementById('edit');
    if (isEditMode) {
        edit.textContent = '[save]';
    } else {
        edit.textContent = '[edit]';
    }

    links.forEach(item => {
        item.setEditMode(isEditMode);
    });

    addNewLinkElement.style.display = isEditMode ? "block" : "none";

    if (!isEditMode) {
        serverSaveLinks();
    }
}
function addNewLink() {
    links.push(new ListItem("", "", links));
    links[links.length - 1].setEditMode(true);
}

document.addEventListener('DOMContentLoaded', () => {
    initialize();
});

/* =================================== server functions =================================== */
function serverSaveLinks() {
    // Clear the JSON file before saving new links
    fetch('/api/links/clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(() => {
            // Save each link individually after clearing
            links.forEach(link => {
                fetch('/api/links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(link), // Serialize each object individually
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Link saved:', data);
                    })
                    .catch(error => console.error('Error saving link:', error));
            });
        })
        .catch(error => console.error('Error clearing links:', error));
}

function serverLoadLinks() {
    fetch('/api/links')
        .then(response => response.json())
        .then(data => {
            data.forEach(link => {
                links.push(new ListItem(link.name, link.url));
            });
        })
        .catch(error => console.error('Error loading links:', error));
}

