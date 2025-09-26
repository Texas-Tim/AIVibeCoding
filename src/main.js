import { LocalStorage } from './core/local-storage.js';
import { AssetLoader } from './core/asset-loader.js';
import { GameState } from './core/game-state.js';
import { PhysicsEngine } from './logic/physics-engine.js';
import { AIController } from './logic/ai-controller.js';
import { AudioManager } from './logic/audio-manager.js';
import { CanvasRenderer } from './presentation/canvas-renderer.js';
import { InputHandler } from './presentation/input-handler.js';
import { GameController } from './controllers/game-controller.js';
import { CONFIG } from './config.js';

/**
 * Main application entry point
 */
class UltimateFrisbeeGame {
    constructor() {
        this.canvas = null;
        this.gameController = null;
        this.localStorage = new LocalStorage();
    }

    async initialize() {
        try {
            // Create canvas
            this.createCanvas();
            
            // Initialize core systems
            const assetLoader = new AssetLoader();
            const gameState = new GameState();
            
            // Load saved settings
            this.loadSettings(gameState);
            
            // Initialize game systems
            const physicsEngine = new PhysicsEngine();
            const aiController = new AIController(gameState);
            const audioManager = new AudioManager(assetLoader);
            const renderer = new CanvasRenderer(this.canvas, assetLoader);
            const inputHandler = new InputHandler(this.canvas);
            
            // Load sprites asynchronously
            this.loadSpritesSync(assetLoader);
            
            // Initialize audio
            await audioManager.initialize();
            
            // Create game controller AFTER sprites are loaded
            this.gameController = new GameController(
                gameState,
                physicsEngine,
                aiController,
                audioManager,
                renderer,
                inputHandler
            );
            
            console.log('Ultimate Frisbee Game initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showError('Failed to load game. Please refresh the page.');
        }
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = CONFIG.CANVAS_WIDTH;
        this.canvas.height = CONFIG.CANVAS_HEIGHT;
        this.canvas.style.border = '2px solid #333';
        this.canvas.style.background = CONFIG.COLORS.FIELD;
        
        const app = document.getElementById('app');
        if (app) {
            app.appendChild(this.canvas);
        } else {
            document.body.appendChild(this.canvas);
        }
    }



    loadSettings(gameState) {
        const settings = this.localStorage.load('gameSettings', {
            difficulty: 'medium',
            soundEnabled: true,
            musicEnabled: true
        });
        
        gameState.setState('gameSettings', settings);
    }

    saveSettings(gameState) {
        const settings = gameState.getState('gameSettings');
        this.localStorage.save('gameSettings', settings);
    }

    loadSpritesSync(assetLoader) {
        console.log('Loading sprites asynchronously...');
        
        // Create images and load them without blocking
        const redImg = new Image();
        const blueImg = new Image();
        const frisbeeImg = new Image();
        
        redImg.onload = () => {
            assetLoader.assets.set('player-team1', redImg);
            console.log('Red sprite loaded');
        };
        
        blueImg.onload = () => {
            assetLoader.assets.set('player-team2', blueImg);
            console.log('Blue sprite loaded');
        };
        
        frisbeeImg.onload = () => {
            assetLoader.assets.set('frisbee', frisbeeImg);
            console.log('Frisbee sprite loaded');
        };
        
        // Set sources to start loading
        redImg.src = CONFIG.ASSETS.SPRITES.PLAYER_TEAM1;
        blueImg.src = CONFIG.ASSETS.SPRITES.PLAYER_TEAM2;
        frisbeeImg.src = CONFIG.ASSETS.SPRITES.FRISBEE;
        
        console.log('Sprite loading initiated, game will continue...');
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4444;
            color: white;
            padding: 20px;
            border-radius: 5px;
            font-family: monospace;
            text-align: center;
            z-index: 1000;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const game = new UltimateFrisbeeGame();
    await game.initialize();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause game when tab is not visible
        console.log('Game paused due to tab visibility');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Could implement responsive canvas sizing here if needed
});

export { UltimateFrisbeeGame };