/**
 * Asset Loader for sprites and audio files
 */
export class AssetLoader {
    constructor() {
        this.assets = new Map();
        this.loadPromises = new Map();
    }

    async loadImage(name, path) {
        if (this.assets.has(name)) {
            console.log(`Asset ${name} already loaded`);
            return this.assets.get(name);
        }

        if (this.loadPromises.has(name)) {
            return this.loadPromises.get(name);
        }

        console.log(`Loading image: ${name} from ${path}`);
        const promise = new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(`Successfully loaded image: ${name}`);
                this.assets.set(name, img);
                this.loadPromises.delete(name);
                resolve(img);
            };
            img.onerror = (error) => {
                console.error(`Failed to load image: ${name} from ${path}`, error);
                this.loadPromises.delete(name);
                reject(new Error(`Failed to load image: ${path}`));
            };
            img.src = path;
        });

        this.loadPromises.set(name, promise);
        return promise;
    }

    async loadAudio(name, path) {
        if (this.assets.has(name)) {
            return this.assets.get(name);
        }

        if (this.loadPromises.has(name)) {
            return this.loadPromises.get(name);
        }

        const promise = new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => {
                this.assets.set(name, audio);
                this.loadPromises.delete(name);
                resolve(audio);
            };
            audio.onerror = () => {
                this.loadPromises.delete(name);
                reject(new Error(`Failed to load audio: ${path}`));
            };
            audio.src = path;
        });

        this.loadPromises.set(name, promise);
        return promise;
    }

    async loadAssets(assetList) {
        console.log('Loading assets:', assetList);
        const promises = assetList.map(asset => {
            if (asset.type === 'image') {
                return this.loadImage(asset.name, asset.path);
            } else if (asset.type === 'audio') {
                return this.loadAudio(asset.name, asset.path);
            }
        });

        const results = await Promise.all(promises);
        console.log('Assets loaded:', this.assets);
        return results;
    }

    getAsset(name) {
        return this.assets.get(name);
    }

    hasAsset(name) {
        return this.assets.has(name);
    }
}