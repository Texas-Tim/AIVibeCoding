import { InputHandler } from '../src/presentation/input-handler.js';

describe('InputHandler', () => {
    let inputHandler;
    let mockCanvas;

    beforeEach(() => {
        mockCanvas = {
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            getBoundingClientRect: () => ({ left: 0, top: 0 })
        };
        
        inputHandler = new InputHandler(mockCanvas);
    });

    afterEach(() => {
        inputHandler.destroy();
    });

    test('should track key presses', () => {
        const event = { code: 'KeyW' };
        inputHandler.handleKeyDown(event);
        
        expect(inputHandler.isKeyPressed('KeyW')).toBe(true);
    });

    test('should track key releases', () => {
        const event = { code: 'KeyW' };
        inputHandler.handleKeyDown(event);
        inputHandler.handleKeyUp(event);
        
        expect(inputHandler.isKeyPressed('KeyW')).toBe(false);
    });

    test('should calculate movement vector correctly', () => {
        inputHandler.handleKeyDown({ code: 'KeyW' });
        inputHandler.handleKeyDown({ code: 'KeyD' });
        
        const vector = inputHandler.getMovementVector();
        
        expect(vector.x).toBeCloseTo(0.707, 2);
        expect(vector.y).toBeCloseTo(-0.707, 2);
    });

    test('should track mouse position', () => {
        const event = { clientX: 100, clientY: 50 };
        inputHandler.handleMouseMove(event);
        
        const position = inputHandler.getMousePosition();
        expect(position.x).toBe(100);
        expect(position.y).toBe(50);
    });

    test('should trigger callbacks on events', () => {
        const mockCallback = jest.fn();
        inputHandler.on('keydown', mockCallback);
        
        inputHandler.handleKeyDown({ code: 'KeyW' });
        
        expect(mockCallback).toHaveBeenCalledWith('KeyW');
    });
});