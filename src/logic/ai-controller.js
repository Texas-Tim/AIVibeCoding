import { CONFIG } from '../config.js';

/**
 * AI Controller for computer opponents
 */
export class AIController {
    constructor(gameState) {
        this.gameState = gameState;
        this.difficulty = 'medium';
        this.reactionTime = 0.5; // seconds
        this.lastDecision = 0;
    }

    update(deltaTime, players, frisbee) {
        this.lastDecision += deltaTime;
        
        if (this.lastDecision < this.reactionTime) return;
        
        const aiPlayers = players.filter(p => p.isAI);
        
        aiPlayers.forEach(player => {
            this.updatePlayerAI(player, frisbee, players, deltaTime);
        });
        
        this.lastDecision = 0;
    }

    updatePlayerAI(player, frisbee, allPlayers, deltaTime) {
        if (player.hasFrisbee) {
            this.handleOffensiveAI(player, frisbee, allPlayers);
        } else {
            this.handleDefensiveAI(player, frisbee, allPlayers);
        }
    }

    handleOffensiveAI(player, frisbee, allPlayers) {
        const teammates = allPlayers.filter(p => p.team === player.team && p !== player);
        const opponents = allPlayers.filter(p => p.team !== player.team);
        
        // Find best teammate to throw to
        let bestTarget = null;
        let bestScore = -1;
        
        teammates.forEach(teammate => {
            const score = this.evaluateThrowTarget(player, teammate, opponents);
            if (score > bestScore) {
                bestScore = score;
                bestTarget = teammate;
            }
        });
        
        if (bestTarget && bestScore > 0.3) {
            this.throwToTarget(player, bestTarget, frisbee);
        }
    }

    handleDefensiveAI(player, frisbee, allPlayers) {
        const opponents = allPlayers.filter(p => p.team !== player.team);
        
        if (frisbee.isFlying) {
            // Try to intercept frisbee
            this.moveTowards(player, frisbee.x, frisbee.y);
        } else {
            // Mark nearest opponent
            const nearestOpponent = this.findNearestOpponent(player, opponents);
            if (nearestOpponent) {
                this.markOpponent(player, nearestOpponent);
            }
        }
    }

    evaluateThrowTarget(thrower, target, opponents) {
        const distance = this.getDistance(thrower, target);
        const distanceScore = Math.max(0, 1 - distance / 200);
        
        // Check if target is open
        const nearestDefender = this.findNearestOpponent(target, opponents);
        const openScore = nearestDefender ? 
            Math.max(0, this.getDistance(target, nearestDefender) / 50 - 1) : 1;
        
        // Prefer forward progress
        const progressScore = target.y < thrower.y ? 0.5 : 0;
        
        return (distanceScore + openScore + progressScore) / 3;
    }

    throwToTarget(player, target, frisbee) {
        const power = Math.min(CONFIG.THROW_POWER_MAX, this.getDistance(player, target) * 2);
        
        // Lead the target slightly
        const leadX = target.velocityX * 0.3;
        const leadY = target.velocityY * 0.3;
        
        frisbee.throw(player.x, player.y, target.x + leadX, target.y + leadY, power);
        player.hasFrisbee = false;
    }

    moveTowards(player, targetX, targetY) {
        const dx = targetX - player.x;
        const dy = targetY - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
            player.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED;
            player.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED;
        }
    }

    markOpponent(player, opponent) {
        const idealDistance = 30;
        const dx = opponent.x - player.x;
        const dy = opponent.y - player.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > idealDistance + 10) {
            this.moveTowards(player, opponent.x, opponent.y);
        } else if (distance < idealDistance - 10) {
            this.moveTowards(player, player.x - dx * 0.1, player.y - dy * 0.1);
        }
    }

    findNearestOpponent(player, opponents) {
        let nearest = null;
        let minDistance = Infinity;
        
        opponents.forEach(opponent => {
            const distance = this.getDistance(player, opponent);
            if (distance < minDistance) {
                minDistance = distance;
                nearest = opponent;
            }
        });
        
        return nearest;
    }

    getDistance(entity1, entity2) {
        const dx = entity1.x - entity2.x;
        const dy = entity1.y - entity2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        switch (difficulty) {
            case 'easy':
                this.reactionTime = 1.0;
                break;
            case 'medium':
                this.reactionTime = 0.5;
                break;
            case 'hard':
                this.reactionTime = 0.2;
                break;
        }
    }
}