import { GameState } from '../src/core/game-state.js';

describe('GameState', () => {
    let gameState;

    beforeEach(() => {
        gameState = new GameState();
    });

    test('should initialize with default state', () => {
        expect(gameState.getState('currentScreen')).toBe('menu');
        expect(gameState.getState('score')).toEqual({ team1: 0, team2: 0 });
        expect(gameState.getState('gameTime')).toBe(180);
    });

    test('should update state', () => {
        gameState.setState('currentScreen', 'game');
        expect(gameState.getState('currentScreen')).toBe('game');
    });

    test('should notify listeners on state change', () => {
        const mockCallback = jest.fn();
        gameState.subscribe('score', mockCallback);
        
        const newScore = { team1: 1, team2: 0 };
        gameState.setState('score', newScore);
        
        expect(mockCallback).toHaveBeenCalledWith(newScore, { team1: 0, team2: 0 });
    });

    test('should unsubscribe listeners', () => {
        const mockCallback = jest.fn();
        const unsubscribe = gameState.subscribe('score', mockCallback);
        
        unsubscribe();
        gameState.setState('score', { team1: 1, team2: 0 });
        
        expect(mockCallback).not.toHaveBeenCalled();
    });

    test('should reset game state', () => {
        gameState.setState('score', { team1: 3, team2: 2 });
        gameState.setState('gameTime', 90);
        gameState.setState('currentScreen', 'game');
        
        gameState.reset();
        
        expect(gameState.getState('score')).toEqual({ team1: 0, team2: 0 });
        expect(gameState.getState('gameTime')).toBe(180);
        expect(gameState.getState('currentScreen')).toBe('menu');
    });
});