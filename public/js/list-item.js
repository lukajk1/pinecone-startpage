class listItem {
    isEditMode = false;
    constructor(siteTitle, siteURL, startpage) {
        this.siteTitle = siteTitle;
        this.siteURL = siteURL;
        this.startpage = startpage;

        this.li = document.createElement('li');
        this.mainList = startpage.mainList;

        mainList.appendChild(this.li);
    }

    setEditMode(boolValue) {
        isEditMode = boolValue;
    }

    defaultLinkDisplayHTML = `
        <span class="link-label"><a href="#">${this.siteTitle}</a></span>
    `;

    li = '';
    link = '';
    editOptions = '';
    inputFields = '';

    delete() {
        this.li.remove();
        // removes the parent <li> which deletes all the child elements
        // later on this needs to meet an express endpoint to remove the list item from the json
    }
}

class startpage {
    constructor(mainList) {
        this.mainList = mainList;
    }
    editOptionsHTML = `
        <span class='edit-options'>
            <a href='#' class='options-style'>archive</a>
            <a href='#' class='options-style'>edit</a>
            <a href='#' class='options-style'>delete</a>
        </span>
    `;

    inputFieldsHTML = `
        <input type="text" name="siteName" size="10" placeholder="site name" autocomplete="off" />
        <br>
        <input type="text" name="siteURL" size="10" placeholder="site url" autocomplete="off" />
    `;


}