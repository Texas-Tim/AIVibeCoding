import { CONFIG } from '../config.js';

/**
 * Physics Engine for game mechanics
 */
export class PhysicsEngine {
    constructor() {
        this.gravity = 0;
        this.friction = CONFIG.FRICTION;
    }

    updatePosition(entity, deltaTime) {
        entity.x += entity.velocityX * deltaTime;
        entity.y += entity.velocityY * deltaTime;
        
        // Apply friction
        entity.velocityX *= this.friction;
        entity.velocityY *= this.friction;
        
        // Boundary checking
        this.checkBoundaries(entity);
    }

    checkBoundaries(entity) {
        const halfSize = entity.size / 2;
        
        if (entity.x - halfSize < 0) {
            entity.x = halfSize;
            entity.velocityX = 0;
        }
        if (entity.x + halfSize > CONFIG.CANVAS_WIDTH) {
            entity.x = CONFIG.CANVAS_WIDTH - halfSize;
            entity.velocityX = 0;
        }
        if (entity.y - halfSize < 0) {
            entity.y = halfSize;
            entity.velocityY = 0;
        }
        if (entity.y + halfSize > CONFIG.CANVAS_HEIGHT) {
            entity.y = CONFIG.CANVAS_HEIGHT - halfSize;
            entity.velocityY = 0;
        }
    }

    checkCollision(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = (entity1.size + entity2.size) / 2;
        
        return distance < minDistance;
    }

    resolveCollision(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return;
        
        const overlap = (entity1.size + entity2.size) / 2 - distance;
        const separationX = (dx / distance) * overlap * 0.5;
        const separationY = (dy / distance) * overlap * 0.5;
        
        entity1.x += separationX;
        entity1.y += separationY;
        entity2.x -= separationX;
        entity2.y -= separationY;
    }

    calculateThrowVector(fromX, fromY, toX, toY, power) {
        const dx = toX - fromX;
        const dy = toY - fromY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) return { x: 0, y: 0 };
        
        const normalizedX = dx / distance;
        const normalizedY = dy / distance;
        
        return {
            x: normalizedX * power,
            y: normalizedY * power
        };
    }
}