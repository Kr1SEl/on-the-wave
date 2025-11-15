class StorageController {
    constructor() {
        this.storage = window['localStorage'];

        const defaultLang = 'en-GB';

        if (!this.storage.getItem("prefLang")) {
            this.storage.setItem('prefLang', defaultLang);
        }
    }

    changePreferredLanguage(languageId) {
        this.storage.setItem('prefLang', languageId);
        location.reload();
    }

    getPreferredLanguage() {
        return this.storage.getItem('prefLang');
    }
}

const storageControllerInstance = new StorageController();
export default storageControllerInstance;