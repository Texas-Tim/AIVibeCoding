/**
 * Input Handler for keyboard and mouse input
 */
export class InputHandler {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = new Set();
        this.mouse = { x: 0, y: 0, clicked: false };
        this.callbacks = new Map();
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
        
        // Mouse events
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        
        // Prevent context menu on right click
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    handleKeyDown(event) {
        this.keys.add(event.code);
        this.triggerCallback('keydown', event.code);
    }

    handleKeyUp(event) {
        this.keys.delete(event.code);
        this.triggerCallback('keyup', event.code);
    }

    handleMouseMove(event) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = event.clientX - rect.left;
        this.mouse.y = event.clientY - rect.top;
        this.triggerCallback('mousemove', this.mouse);
    }

    handleMouseDown(event) {
        this.mouse.clicked = true;
        this.triggerCallback('mousedown', this.mouse);
    }

    handleMouseUp(event) {
        this.mouse.clicked = false;
        this.triggerCallback('mouseup', this.mouse);
    }

    isKeyPressed(keyCode) {
        return this.keys.has(keyCode);
    }

    getMovementVector() {
        let x = 0;
        let y = 0;
        
        if (this.isKeyPressed('KeyA') || this.isKeyPressed('ArrowLeft')) x -= 1;
        if (this.isKeyPressed('KeyD') || this.isKeyPressed('ArrowRight')) x += 1;
        if (this.isKeyPressed('KeyW') || this.isKeyPressed('ArrowUp')) y -= 1;
        if (this.isKeyPressed('KeyS') || this.isKeyPressed('ArrowDown')) y += 1;
        
        // Normalize diagonal movement
        if (x !== 0 && y !== 0) {
            const length = Math.sqrt(x * x + y * y);
            x /= length;
            y /= length;
        }
        
        return { x, y };
    }

    isActionPressed(action) {
        switch (action) {
            case 'pause':
                return this.isKeyPressed('Space') || this.isKeyPressed('Escape');
            case 'restart':
                return this.isKeyPressed('KeyR');
            case 'throw':
                return this.mouse.clicked;
            default:
                return false;
        }
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    on(event, callback) {
        if (!this.callbacks.has(event)) {
            this.callbacks.set(event, []);
        }
        this.callbacks.get(event).push(callback);
    }

    off(event, callback) {
        const callbacks = this.callbacks.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    triggerCallback(event, data) {
        const callbacks = this.callbacks.get(event);
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Error in input callback:', error);
                }
            });
        }
    }

    destroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
        this.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.canvas.removeEventListener('mousedown', this.handleMouseDown);
        this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        this.canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
    }
}