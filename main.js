let isEditMode = false;
const links = [];
const mainList = null;

function initialize() {
    edit = document.getElementById('edit');
    edit.addEventListener('click', toggleEditMode);

    const mainList = document.getElementById('main-list');
    const myStartpage = new startpage(mainList);

    //const linkLabels = document.querySelectorAll('.link-label');

    //linkLabels.forEach(linkLabel => {
    //    linkLabel.insertAdjacentHTML('afterend', editOptionsHTML);
    //    const editOptions = linkLabel.nextElementSibling;
    //    editOptionsArray.push(editOptions);
    //    editOptions.style.display = 'none';
    //});

    //const addNewLink = document.getElementById('addNewLink');
    //addNewLink.style.display = 'none';
    //editOptionsArray.push(addNewLink);

    const link1 = new listItem('youtube', 'https://www.youtube.com/');
    link1.li.textContent = 'a link title';
    mainList.appendChild(link1.li);


}
function toggleEditMode() {
    isEditMode = !isEditMode;
    if (isEditMode) {
        edit.textContent = 'save';
    }
    else {
        edit.textContent = 'edit';
    }
    //alert(editMode);
    editOptionsArray.forEach(editOptions => {
        editOptions.style.display = isEditMode ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {

    initialize();

    const linksList = document.querySelector('ul');

    // Load existing links
    fetch('/links')
      .then(response => response.json())
      .then(links => {
        links.forEach(link => addLinkToDOM(link));
      });

    //document.getElementById('edit').addEventListener('click', () => {
    //  const title = prompt('Enter link title:');
    //  const url = prompt('Enter link URL:');
    //  if (title && url) {
    //    // Add a new link via the API
    //    fetch('/links', {
    //      method: 'POST',
    //      headers: {
    //        'Content-Type': 'application/json'
    //      },
    //      body: JSON.stringify({ title, url })
    //    })
    //    .then(response => response.json())
    //    .then(newLink => {
    //      addLinkToDOM(newLink);
    //    });
    //  }
    //});

    // Function to add a link to the DOM
    function addLinkToDOM(link) {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${link.url}" target="_blank">${link.title}</a> 
                      <button onclick="deleteLink(${link.id})">Delete</button>`;
      linksList.appendChild(li);
    }

    // Function to delete a link via the API
    window.deleteLink = function(id) {
      fetch(`/links/${id}`, {
        method: 'DELETE'
      })
      .then(() => {
        // Remove link from DOM after successful deletion
        const linkItem = document.querySelector(`button[onclick='deleteLink(${id})']`).parentElement;
        linksList.removeChild(linkItem);
      });
    };
  });
