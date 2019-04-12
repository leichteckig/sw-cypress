export default class storage {
    static storage = {};

    static add(key, value) {
        this.storage = {
            key: value,
            ...storage
        };

        return this.storage;
    }

    static remove(key) {
        delete this.storage[key];

        return this.storage;
    }

    static getStorage() {
        return this.storage;
    }

    static setToEmptyState() {
        this.storage = {};

        return this.storage;
    }
}