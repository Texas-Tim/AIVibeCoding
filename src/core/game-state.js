/**
 * Central Game State Management
 */
export class GameState {
    constructor() {
        this.state = {
            currentScreen: 'menu', // menu, game, pause, gameOver
            score: { team1: 0, team2: 0 },
            gameTime: 180, // 3 minutes in seconds
            players: [],
            frisbee: null,
            field: null,
            gameSettings: {
                difficulty: 'medium',
                soundEnabled: true,
                musicEnabled: true
            }
        };
        this.listeners = new Map();
    }

    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        this.notifyListeners(key, value, oldValue);
    }

    getState(key) {
        return key ? this.state[key] : this.state;
    }

    updateState(updates) {
        Object.keys(updates).forEach(key => {
            this.setState(key, updates[key]);
        });
    }

    subscribe(key, callback) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, []);
        }
        this.listeners.get(key).push(callback);
        
        return () => {
            const callbacks = this.listeners.get(key);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }

    notifyListeners(key, newValue, oldValue) {
        const callbacks = this.listeners.get(key);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(newValue, oldValue);
                } catch (error) {
                    console.error('Error in state listener:', error);
                }
            });
        }
    }

    reset() {
        this.setState('score', { team1: 0, team2: 0 });
        this.setState('gameTime', 180);
        this.setState('currentScreen', 'menu');
    }
}