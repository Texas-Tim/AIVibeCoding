import { GameController } from '../src/controllers/game-controller.js';

describe('GameController', () => {
    let gameController;
    let mockGameState;
    let mockPhysics;
    let mockAI;
    let mockAudio;
    let mockRenderer;
    let mockInput;

    beforeEach(() => {
        mockGameState = {
            setState: jest.fn(),
            getState: jest.fn().mockReturnValue('menu'),
            reset: jest.fn()
        };
        
        mockPhysics = {
            updatePosition: jest.fn(),
            checkCollision: jest.fn(),
            calculateThrowVector: jest.fn().mockReturnValue({ x: 100, y: 0 })
        };
        
        mockAI = { update: jest.fn() };
        mockAudio = { onGameStart: jest.fn(), onThrow: jest.fn(), onCatch: jest.fn() };
        mockRenderer = { drawMenu: jest.fn(), clear: jest.fn(), drawField: jest.fn() };
        mockInput = { on: jest.fn(), getMovementVector: jest.fn().mockReturnValue({ x: 0, y: 0 }) };

        gameController = new GameController(
            mockGameState,
            mockPhysics,
            mockAI,
            mockAudio,
            mockRenderer,
            mockInput
        );
    });

    test('should initialize with correct number of players', () => {
        expect(gameController.players).toHaveLength(6); // 3 per team
    });

    test('should create frisbee with initial state', () => {
        expect(gameController.frisbee).toBeDefined();
        expect(gameController.frisbee.isFlying).toBe(false);
        expect(gameController.frisbee.isVisible).toBe(false);
    });

    test('should start game correctly', () => {
        gameController.startGame();
        
        expect(mockGameState.setState).toHaveBeenCalledWith('currentScreen', 'game');
        expect(mockAudio.onGameStart).toHaveBeenCalled();
    });

    test('should handle throw action', () => {
        // Set up a player with frisbee
        gameController.players[0].hasFrisbee = true;
        gameController.players[0].isSelected = true;
        
        gameController.handleThrow(200, 100);
        
        expect(mockPhysics.calculateThrowVector).toHaveBeenCalled();
        expect(mockAudio.onThrow).toHaveBeenCalled();
    });

    test('should catch frisbee when collision detected', () => {
        const player = gameController.players[1];
        gameController.frisbee.isFlying = true;
        
        gameController.catchFrisbee(player);
        
        expect(player.hasFrisbee).toBe(true);
        expect(gameController.frisbee.isFlying).toBe(false);
        expect(mockAudio.onCatch).toHaveBeenCalled();
    });
});