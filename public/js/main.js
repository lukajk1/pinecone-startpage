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

function serverLoadLinks() {
    fetch('/api/links')
        .then(response => response.json())
        .then(data => {
            data.forEach(link => {
                links.push(new ListItem(link.siteTitle, link.siteURL, links));
            });
        })
        .catch(error => console.error('Error loading links:', error));
}

function serverSaveLinks() {
    // Clear the JSON file before saving new links
    fetch('/api/links/clear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    .then(() => {
        const plainLinks = links.map(link => ({
            siteTitle: link.siteTitle,
            siteURL: link.siteURL
        }));

        fetch('/api/links/bulkSave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(plainLinks),
        })
            .then(response => response.json())
            .then(data => {
                console.log('All links saved:', data);
            })
            .catch(error => console.error('Error saving links:', error));
    })
    .catch(error => console.error('Error clearing links:', error));
}



