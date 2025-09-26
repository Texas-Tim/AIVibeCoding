/**
 * UI Controller for menus and user interface
 */
export class UIController {
    constructor(gameState, audioManager) {
        this.gameState = gameState;
        this.audio = audioManager;
        this.menuItems = [];
        this.selectedIndex = 0;
    }

    createMainMenu() {
        return [
            { text: 'Start Game', action: 'start' },
            { text: 'Settings', action: 'settings' },
            { text: 'Instructions', action: 'instructions' }
        ];
    }

    createSettingsMenu() {
        const settings = this.gameState.getState('gameSettings');
        return [
            { text: `Sound: ${settings.soundEnabled ? 'ON' : 'OFF'}`, action: 'toggleSound' },
            { text: `Music: ${settings.musicEnabled ? 'ON' : 'OFF'}`, action: 'toggleMusic' },
            { text: `Difficulty: ${settings.difficulty.toUpperCase()}`, action: 'cycleDifficulty' },
            { text: 'Back', action: 'back' }
        ];
    }

    handleMenuInput(key) {
        if (key === 'ArrowUp' || key === 'KeyW') {
            this.selectedIndex = Math.max(0, this.selectedIndex - 1);
        } else if (key === 'ArrowDown' || key === 'KeyS') {
            this.selectedIndex = Math.min(this.menuItems.length - 1, this.selectedIndex + 1);
        } else if (key === 'Enter' || key === 'Space') {
            return this.executeAction(this.menuItems[this.selectedIndex].action);
        }
        return null;
    }

    executeAction(action) {
        switch (action) {
            case 'start':
                return 'startGame';
            case 'settings':
                this.menuItems = this.createSettingsMenu();
                this.selectedIndex = 0;
                return 'showSettings';
            case 'instructions':
                return 'showInstructions';
            case 'toggleSound':
                this.toggleSetting('soundEnabled');
                this.menuItems = this.createSettingsMenu();
                break;
            case 'toggleMusic':
                this.toggleSetting('musicEnabled');
                this.menuItems = this.createSettingsMenu();
                break;
            case 'cycleDifficulty':
                this.cycleDifficulty();
                this.menuItems = this.createSettingsMenu();
                break;
            case 'back':
                this.menuItems = this.createMainMenu();
                this.selectedIndex = 0;
                return 'showMainMenu';
        }
        return null;
    }

    toggleSetting(setting) {
        const settings = this.gameState.getState('gameSettings');
        settings[setting] = !settings[setting];
        this.gameState.setState('gameSettings', settings);
        
        if (setting === 'soundEnabled') {
            this.audio.setSoundEnabled(settings[setting]);
        } else if (setting === 'musicEnabled') {
            this.audio.setMusicEnabled(settings[setting]);
        }
    }

    cycleDifficulty() {
        const settings = this.gameState.getState('gameSettings');
        const difficulties = ['easy', 'medium', 'hard'];
        const currentIndex = difficulties.indexOf(settings.difficulty);
        const nextIndex = (currentIndex + 1) % difficulties.length;
        settings.difficulty = difficulties[nextIndex];
        this.gameState.setState('gameSettings', settings);
    }

    getMenuItems() {
        return this.menuItems;
    }

    getSelectedIndex() {
        return this.selectedIndex;
    }

    setMenuItems(items) {
        this.menuItems = items;
        this.selectedIndex = 0;
    }
}