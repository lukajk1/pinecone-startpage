class ListItem {
    isEditMode = false;
    constructor(siteTitle, siteURL, linkArray) {
        this.siteTitle = siteTitle;
        this.siteURL = siteURL;
        this.linkArray = linkArray;

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
                <input type="text" class="input-bottom" name="siteURL" size="24" placeholder="site url" autocomplete="off" />
            </span>
        `;
        this.li.insertAdjacentHTML('beforeend', inputFieldsHTML);
    }

    initEditOptions() {
        const editOptionsHTML = `
            <span class='edit-options' style="display:none; position: relative; top: -48px;">
                <a href='#' class='options-style' id='up'>[up]</a>
                <a href='#' class='options-style' id='down'>[down]</a>
                <a href='#' class='options-style'id='delete'>[del]</a>
            </span>
        `;

        this.li.insertAdjacentHTML('beforeend', editOptionsHTML);

        this.li.querySelector('#delete').addEventListener('click', () => this.delete());
        this.li.querySelector('#up').addEventListener('click', () => this.moveUp());
        this.li.querySelector('#down').addEventListener('click', () => this.moveDown());
    }

    moveUp() {
        const index = this.linkArray.indexOf(this);
        const previous = this.li.previousElementSibling;

        if (index > 0) {
            [this.linkArray[index - 1], this.linkArray[index]] = [this.linkArray[index], this.linkArray[index - 1]];
            this.mainList.insertBefore(this.li, previous);
        }
    }

    moveDown() {
        const index = this.linkArray.indexOf(this);
        const next = this.li.nextElementSibling;

        if (index < links.length - 1) {
            [this.linkArray[index], this.linkArray[index + 1]] = [this.linkArray[index + 1], this.linkArray[index]];
            this.mainList.insertBefore(next, this.li);
        }
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
        // this doesn't work and too lazy to fix
        //if (!value) {
        //    const siteNameInput = this.inputFields.querySelector('input[name="siteName"]');
        //    const siteURLInput = this.inputFields.querySelector('input[name="siteURL"]');
        //    if (siteNameInput === "" && siteURLInput === "") {
        //        this.delete();
        //    }
        //}

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
        if ((this.siteTitle === "" && this.siteURL === "") ||
            (this.siteTitle === "unnamed link" && this.siteURL === "")) {
            this.removeSelf();
        }

        else {
            const confirmed = confirm("Confirm delete?");

            if (confirmed) {

                this.removeSelf();
            }

            else {
                return; 
            }

        }
    }

    removeSelf() {
        this.li.remove();

        const index = this.linkArray.indexOf(this);
        if (index !== -1) {
            this.linkArray.splice(index, 1);
        }
    }
}