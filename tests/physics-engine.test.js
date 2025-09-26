import { PhysicsEngine } from '../src/logic/physics-engine.js';

describe('PhysicsEngine', () => {
    let physics;
    let mockEntity;

    beforeEach(() => {
        physics = new PhysicsEngine();
        mockEntity = {
            x: 100,
            y: 100,
            velocityX: 50,
            velocityY: 30,
            size: 16
        };
    });

    test('should update entity position based on velocity', () => {
        const deltaTime = 0.016; // 60 FPS
        
        physics.updatePosition(mockEntity, deltaTime);
        
        expect(mockEntity.x).toBeCloseTo(100.8);
        expect(mockEntity.y).toBeCloseTo(100.48);
    });

    test('should apply friction to velocity', () => {
        const deltaTime = 0.016;
        const initialVelocityX = mockEntity.velocityX;
        
        physics.updatePosition(mockEntity, deltaTime);
        
        expect(mockEntity.velocityX).toBeLessThan(initialVelocityX);
    });

    test('should detect collision between entities', () => {
        const entity1 = { x: 100, y: 100, size: 16 };
        const entity2 = { x: 110, y: 100, size: 16 };
        
        const collision = physics.checkCollision(entity1, entity2);
        
        expect(collision).toBe(true);
    });

    test('should not detect collision when entities are far apart', () => {
        const entity1 = { x: 100, y: 100, size: 16 };
        const entity2 = { x: 200, y: 100, size: 16 };
        
        const collision = physics.checkCollision(entity1, entity2);
        
        expect(collision).toBe(false);
    });

    test('should calculate throw vector correctly', () => {
        const vector = physics.calculateThrowVector(0, 0, 100, 0, 200);
        
        expect(vector.x).toBeCloseTo(200);
        expect(vector.y).toBeCloseTo(0);
    });
});