class ListItem {
    isEditMode = false;
    constructor(siteTitle, siteURL) {
        this.siteTitle = siteTitle;
        this.siteURL = siteURL;
        this.startpage = startpage;

        this.li = document.createElement('li');
        this.mainList = document.getElementById('main-list');
        this.mainList.appendChild(this.li);

        // Construct HTML elements
        this.initLink();
        this.initInputFields();
        this.initEditOptions();

        this.mainLink = this.li.querySelector('.link-label');
        this.inputFields = this.li.querySelector('.input-fields');
        this.editOptions = this.li.querySelector('.edit-options');

        this.inputSiteName = this.li.querySelector('input[name="siteName"]');
        this.inputSiteName.value = siteTitle;
        this.inputSiteURL = this.li.querySelector('input[name="siteURL"]');
        this.inputSiteURL.value = siteURL;

    }

    initLink() {
        const linkHTML = `
            <span class="link-label">
                <a href="${this.siteURL || '#'}">${this.siteTitle || 'unnamed link'}</a>
            </span>
        `;
        this.li.insertAdjacentHTML('beforeend', linkHTML);
    }

    initInputFields() {
        const inputFieldsHTML = `
            <span class="input-fields" style="display:none;">
                <input type="text" name="siteName" size="24" placeholder="site name" autocomplete="off" />
                <br>
                <input type="text" name="siteURL" size="24" placeholder="site url" autocomplete="off" />
            </span>
        `;
        this.li.insertAdjacentHTML('beforeend', inputFieldsHTML);
    }

    initEditOptions() {
        const editOptionsHTML = `
            <span class='edit-options' style="display:none; position: relative; top: -40px;">
                <a href='#' class='options-style'id='delete'>[-]</a>
            </span>
        `;

        // older version
        //const editOptionsHTML = `
        //    <span class='edit-options' style="display:none;">
        //        <a href='#' class='options-style'>archive</a>
        //        <a href='#' class='options-style' id='save'>edit</a>
        //        <a href='#' class='options-style' id='delete'>delete</a>
        //    </span>
        //`;
        this.li.insertAdjacentHTML('beforeend', editOptionsHTML);

        //this.li.querySelector('#save').addEventListener('click', () => this.toggleEditMode());
        this.li.querySelector('#delete').addEventListener('click', () => this.delete());
    }

    setFieldsDisplay(show) {
        if (show) {
            this.inputFields.style.display = 'block';
        } else {
            this.inputFields.style.display = 'none';
            this.saveFields();
        }
    }

    setEditMode(value) {
        this.isEditMode = value;
        this.setFieldsDisplay(this.isEditMode);
        this.editOptions.style.display = this.isEditMode ? 'block' : 'none';
        this.mainLink.style.display = this.isEditMode ? 'none' : 'block';
    }

    saveFields() {
        const siteNameInput = this.inputFields.querySelector('input[name="siteName"]');
        const siteURLInput = this.inputFields.querySelector('input[name="siteURL"]');

        // Update the values
        if (siteNameInput && siteURLInput) {
            this.siteTitle = siteNameInput.value || 'unnamed link';
            this.siteURL = siteURLInput.value;

            // Update the displayed link
            const linkElement = this.li.querySelector('.link-label a');
            if (linkElement) {
                linkElement.textContent = this.siteTitle;
                linkElement.href = this.siteURL;
            }
        }
    }

    delete() {
<<<<<<< HEAD
        if (
            (this.siteTitle === "" && this.siteURL === "")
        ) {
            this.li.remove();
        }
        else {
            const confirmed = confirm("Confirm delete?");

            if (confirmed) {

                this.li.remove();
            }
            else {
                return; 
            }
=======
        const confirmed = confirm("Confirm delete?");

        if (confirmed) {

            this.li.remove();
        }
        else {
            return; 
>>>>>>> 8e15f5539d9bc8e5ff0864f07e4eec37f49068c9
        }
    }
}


class startpage {
    constructor(mainList) {
        this.mainList = mainList;
    }
}