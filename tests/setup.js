// Jest setup file
global.localStorage = {
    store: {},
    getItem: function(key) {
        return this.store[key] || null;
    },
    setItem: function(key, value) {
        this.store[key] = value.toString();
    },
    removeItem: function(key) {
        delete this.store[key];
    },
    clear: function() {
        this.store = {};
    }
};

// Mock Image constructor
global.Image = class {
    constructor() {
        setTimeout(() => {
            this.onload && this.onload();
        }, 0);
    }
};

// Mock Audio constructor
global.Audio = class {
    constructor() {
        setTimeout(() => {
            this.oncanplaythrough && this.oncanplaythrough();
        }, 0);
    }
};