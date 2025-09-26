import { LocalStorage } from '../src/core/local-storage.js';

describe('LocalStorage', () => {
    let localStorage;

    beforeEach(() => {
        localStorage = new LocalStorage();
        // Clear any existing data
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    test('should save and load data', () => {
        const testData = { score: 100, level: 5 };
        
        const saved = localStorage.save('gameData', testData);
        expect(saved).toBe(true);
        
        const loaded = localStorage.load('gameData');
        expect(loaded).toEqual(testData);
    });

    test('should return default value for non-existent key', () => {
        const defaultValue = { score: 0 };
        const result = localStorage.load('nonExistent', defaultValue);
        expect(result).toEqual(defaultValue);
    });

    test('should remove data', () => {
        localStorage.save('testKey', 'testValue');
        
        const removed = localStorage.remove('testKey');
        expect(removed).toBe(true);
        
        const result = localStorage.load('testKey');
        expect(result).toBeNull();
    });

    test('should clear all game data', () => {
        localStorage.save('key1', 'value1');
        localStorage.save('key2', 'value2');
        
        const cleared = localStorage.clear();
        expect(cleared).toBe(true);
        
        expect(localStorage.load('key1')).toBeNull();
        expect(localStorage.load('key2')).toBeNull();
    });
});