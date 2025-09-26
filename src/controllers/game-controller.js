import { CONFIG } from '../config.js';

/**
 * Game Controller - Central game orchestration
 */
export class GameController {
    constructor(gameState, physicsEngine, aiController, audioManager, renderer, inputHandler) {
        this.gameState = gameState;
        this.physics = physicsEngine;
        this.ai = aiController;
        this.audio = audioManager;
        this.renderer = renderer;
        this.input = inputHandler;
        
        this.players = [];
        this.frisbee = null;
        this.lastTime = 0;
        this.gameLoop = null;
        
        this.initializeGame();
        this.setupInputHandlers();
    }

    initializeGame() {
        this.createPlayers();
        this.createFrisbee();
        this.gameState.setState('currentScreen', 'menu');
        this.startMenuLoop();
    }

    createPlayers() {
        this.players = [];
        
        // Team 1 (Red) - Human controlled
        for (let i = 0; i < CONFIG.TEAM_SIZE; i++) {
            this.players.push({
                id: `team1_${i}`,
                team: 1,
                number: i + 1,
                x: 150 + i * 50,
                y: 200 + i * 100,
                velocityX: 0,
                velocityY: 0,
                size: CONFIG.PLAYER_SIZE,
                hasFrisbee: i === 0,
                isAI: false,
                isSelected: i === 0
            });
        }
        
        // Team 2 (Blue) - AI controlled
        for (let i = 0; i < CONFIG.TEAM_SIZE; i++) {
            this.players.push({
                id: `team2_${i}`,
                team: 2,
                number: i + 1,
                x: 650 - i * 50,
                y: 200 + i * 100,
                velocityX: 0,
                velocityY: 0,
                size: CONFIG.PLAYER_SIZE,
                hasFrisbee: false,
                isAI: true,
                isSelected: false
            });
        }
    }

    createFrisbee() {
        this.frisbee = {
            x: this.players[0].x,
            y: this.players[0].y,
            velocityX: 0,
            velocityY: 0,
            size: CONFIG.FRISBEE_SIZE,
            isFlying: false,
            isVisible: false,
            startX: 0,
            startY: 0,
            owner: this.players[0]
        };
    }

    setupInputHandlers() {
        this.input.on('keydown', (key) => {
            const state = this.gameState.getState('currentScreen');
            
            if (key === 'Space') {
                // Enable audio on first interaction
                this.audio.enableAudioContext();
                
                if (state === 'menu') {
                    this.startGame();
                } else if (state === 'game') {
                    this.pauseGame();
                } else if (state === 'pause') {
                    this.resumeGame();
                }
            }
            
            if (key === 'KeyR') {
                this.restartGame();
            }
            
            if (key === 'KeyM') {
                this.goToMenu();
            }
            
            // Player selection with number keys (1, 2, 3)
            if (key === 'Digit1') {
                this.selectPlayer(1);
            }
            if (key === 'Digit2') {
                this.selectPlayer(2);
            }
            if (key === 'Digit3') {
                this.selectPlayer(3);
            }
        });
        
        this.input.on('mousedown', (mouse) => {
            // Enable audio on first interaction
            this.audio.enableAudioContext();
            
            if (this.gameState.getState('currentScreen') === 'game') {
                this.handleThrow(mouse.x, mouse.y);
            }
        });
    }

    startGame() {
        this.stopGameLoop();
        this.gameState.setState('currentScreen', 'game');
        this.gameState.setState('gameTime', CONFIG.GAME_DURATION);
        try {
            this.audio.onGameStart();
        } catch (e) {
            console.warn('Audio failed to start:', e);
        }
        this.startGameLoop();
    }

    pauseGame() {
        this.gameState.setState('currentScreen', 'pause');
        this.audio.onGamePause();
        this.stopGameLoop();
    }

    resumeGame() {
        this.gameState.setState('currentScreen', 'game');
        this.audio.onGameResume();
        this.startGameLoop();
    }

    restartGame() {
        this.gameState.reset();
        this.initializeGame();
        this.startGame();
    }
    
    goToMenu() {
        this.stopGameLoop();
        this.gameState.reset();
        this.initializeGame();
    }
    
    selectPlayer(playerNumber) {
        // Only allow selecting team 1 (human) players
        const targetPlayer = this.players.find(p => p.team === 1 && p.number === playerNumber);
        if (targetPlayer) {
            // Clear all selections
            this.players.forEach(p => p.isSelected = false);
            // Select the target player
            targetPlayer.isSelected = true;
            console.log(`Selected player ${playerNumber}`);
        }
    }

    startGameLoop() {
        this.stopGameLoop();
        this.lastTime = performance.now();
        this.gameLoop = requestAnimationFrame((time) => this.update(time));
    }
    
    startMenuLoop() {
        if (this.gameLoop) return;
        
        this.gameLoop = requestAnimationFrame(() => this.renderMenu());
    }
    
    renderMenu() {
        this.render();
        if (this.gameState.getState('currentScreen') === 'menu') {
            this.gameLoop = requestAnimationFrame(() => this.renderMenu());
        }
    }

    stopGameLoop() {
        if (this.gameLoop) {
            cancelAnimationFrame(this.gameLoop);
            this.gameLoop = null;
        }
    }

    update(currentTime) {
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        if (this.gameState.getState('currentScreen') === 'game') {
            this.updateGame(deltaTime);
            this.updateTimer(deltaTime);
        }
        
        this.render();
        
        if (this.gameState.getState('currentScreen') === 'game') {
            this.gameLoop = requestAnimationFrame((time) => this.update(time));
        }
    }

    updateGame(deltaTime) {
        this.updatePlayerMovement(deltaTime);
        this.updateFrisbee(deltaTime);
        // this.ai.update(deltaTime, this.players, this.frisbee); // Disabled - AI handled in updatePlayerMovement
        this.checkCollisions();
        this.checkScoring();
    }

    updatePlayerMovement(deltaTime) {
        const selectedPlayer = this.players.find(p => p.isSelected);
        if (selectedPlayer && !selectedPlayer.isAI && !selectedPlayer.hasFrisbee) {
            const movement = this.input.getMovementVector();
            selectedPlayer.velocityX = movement.x * CONFIG.PLAYER_SPEED;
            selectedPlayer.velocityY = movement.y * CONFIG.PLAYER_SPEED;
        }
        
        // Basic AI for inactive red team players
        this.players.forEach(redPlayer => {
            if (!redPlayer.isAI && !redPlayer.isSelected && !redPlayer.hasFrisbee) {
                const humanWithFrisbee = this.players.find(p => p.team === 1 && p.hasFrisbee);
                const aiWithFrisbee = this.players.find(p => p.team === 2 && p.hasFrisbee);
                
                if (this.frisbee.isVisible && this.frisbee.isFlying) {
                    // Chase flying frisbee
                    const dx = this.frisbee.x - redPlayer.x;
                    const dy = this.frisbee.y - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 10) {
                        redPlayer.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.7;
                        redPlayer.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.7;
                    }
                } else if (this.frisbee.isVisible && !this.frisbee.isFlying) {
                    // Chase loose frisbee
                    const dx = this.frisbee.x - redPlayer.x;
                    const dy = this.frisbee.y - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 10) {
                        redPlayer.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.8;
                        redPlayer.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.8;
                    }
                } else if (aiWithFrisbee) {
                    // Defensive: pressure ball carrier while maintaining spacing
                    const teammates = this.players.filter(p => p.team === 1 && p !== redPlayer);
                    
                    let targetX = aiWithFrisbee.x;
                    let targetY = aiWithFrisbee.y;
                    
                    // Avoid clustering with teammates on defense
                    teammates.forEach(teammate => {
                        const dx = redPlayer.x - teammate.x;
                        const dy = redPlayer.y - teammate.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 60) {
                            targetX += dx * 0.3;
                            targetY += dy * 0.3;
                        }
                    });
                    
                    const dx = targetX - redPlayer.x;
                    const dy = targetY - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 30) {
                        redPlayer.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.7;
                        redPlayer.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.7;
                    } else {
                        // Keep moving around the ball carrier
                        redPlayer.velocityX = (Math.random() - 0.5) * CONFIG.PLAYER_SPEED * 0.4;
                        redPlayer.velocityY = (Math.random() - 0.5) * CONFIG.PLAYER_SPEED * 0.4;
                    }
                } else if (humanWithFrisbee) {
                    // Offensive: spread out and get open for passes
                    const teammates = this.players.filter(p => p.team === 1 && p !== redPlayer);
                    const opponents = this.players.filter(p => p.team === 2);
                    
                    let targetX = CONFIG.CANVAS_WIDTH - 50; // Toward goal
                    let targetY = CONFIG.CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * 120;
                    
                    // Spread out from teammates
                    teammates.forEach(teammate => {
                        const dx = redPlayer.x - teammate.x;
                        const dy = redPlayer.y - teammate.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 70) {
                            targetX += dx * 0.4;
                            targetY += dy * 0.4;
                        }
                    });
                    
                    // Check if passing lane to frisbee holder is blocked
                    const passingLaneBlocked = opponents.some(opponent => {
                        const distToLine = this.distanceToLine(humanWithFrisbee.x, humanWithFrisbee.y, redPlayer.x, redPlayer.y, opponent.x, opponent.y);
                        return distToLine < 25; // 25 pixel buffer for passing lane
                    });
                    
                    if (passingLaneBlocked) {
                        // Move perpendicular to the passing lane to get open
                        const dx = redPlayer.x - humanWithFrisbee.x;
                        const dy = redPlayer.y - humanWithFrisbee.y;
                        const perpX = -dy; // Perpendicular direction
                        const perpY = dx;
                        const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
                        
                        if (perpLength > 0) {
                            targetX += (perpX / perpLength) * 60;
                            targetY += (perpY / perpLength) * 60;
                        }
                    }
                    
                    // Also avoid being too close to defenders
                    const nearestDefender = opponents.reduce((nearest, opponent) => {
                        const distance = Math.sqrt((opponent.x - redPlayer.x) ** 2 + (opponent.y - redPlayer.y) ** 2);
                        return !nearest || distance < nearest.distance ? {player: opponent, distance} : nearest;
                    }, null);
                    
                    if (nearestDefender && nearestDefender.distance < 40) {
                        const dx = redPlayer.x - nearestDefender.player.x;
                        const dy = redPlayer.y - nearestDefender.player.y;
                        targetX += dx * 0.6;
                        targetY += dy * 0.6;
                    }
                    
                    const dx = targetX - redPlayer.x;
                    const dy = targetY - redPlayer.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance > 15) {
                        redPlayer.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.6;
                        redPlayer.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.6;
                    } else {
                        // Keep moving to stay open
                        redPlayer.velocityX = (Math.random() - 0.5) * CONFIG.PLAYER_SPEED * 0.3;
                        redPlayer.velocityY = (Math.random() - 0.5) * CONFIG.PLAYER_SPEED * 0.3;
                    }
                } else {
                    redPlayer.velocityX = 0;
                    redPlayer.velocityY = 0;
                }
            }
        });
        
        // Blue team AI behavior
        this.players.forEach(player => {
            if (player.isAI) {
                if (player.hasFrisbee) {
                    // AI with frisbee: throw to teammate or toward goal
                    if (!player.aiThrowTimer) player.aiThrowTimer = 0;
                    player.aiThrowTimer += deltaTime;
                    
                    if (player.aiThrowTimer > 1) { // Wait 1 second before throwing
                        const teammates = this.players.filter(p => p.team === player.team && p !== player);
                        const opponents = this.players.filter(p => p.team !== player.team);
                        
                        // Find best teammate with clear passing lane
                        const bestTeammate = teammates.reduce((best, teammate) => {
                            const distance = Math.sqrt((teammate.x - player.x) ** 2 + (teammate.y - player.y) ** 2);
                            
                            // Check if passing lane is clear (no opponent too close to the line)
                            const passingLaneClear = !opponents.some(opponent => {
                                const distToLine = this.distanceToLine(player.x, player.y, teammate.x, teammate.y, opponent.x, opponent.y);
                                return distToLine < 30; // 30 pixel buffer
                            });
                            
                            if (!passingLaneClear) return best;
                            
                            return !best || distance < best.distance ? {player: teammate, distance} : best;
                        }, null);
                        
                        if (bestTeammate && bestTeammate.distance < 200) {
                            // Throw to teammate with clear lane
                            this.throwFrisbee(player, bestTeammate.player.x, bestTeammate.player.y);
                            player.aiThrowTimer = 0;
                        } else {
                            // No clear pass, check if teammate is near goal before throwing
                            if (player.aiThrowTimer > 3) {
                                const goalX = player.team === 2 ? 50 : CONFIG.CANVAS_WIDTH - 50;
                                const goalY = CONFIG.CANVAS_HEIGHT / 2;
                                
                                // Only throw toward goal if teammate is reasonably close to catch it
                                const teammateNearGoal = teammates.some(teammate => {
                                    const distToGoal = Math.sqrt((teammate.x - goalX) ** 2 + (teammate.y - goalY) ** 2);
                                    return distToGoal < 80; // Teammate within 80 pixels of goal area
                                });
                                
                                if (teammateNearGoal) {
                                    this.throwFrisbee(player, goalX, goalY);
                                    player.aiThrowTimer = 0;
                                } else {
                                    // No good option, reset timer and wait for better opportunity
                                    player.aiThrowTimer = 2; // Reset to 2 seconds to try again soon
                                }
                            }
                        }
                    }
                } else {
                    // AI without frisbee behavior
                    const humanWithFrisbee = this.players.find(p => p.team === 1 && p.hasFrisbee);
                    const aiWithFrisbee = this.players.find(p => p.team === 2 && p.hasFrisbee);
                    
                    if (this.frisbee.isVisible && this.frisbee.isFlying) {
                        // Chase flying frisbee for interception
                        const dx = this.frisbee.x - player.x;
                        const dy = this.frisbee.y - player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance > 10) {
                            player.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED;
                            player.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED;
                        } else {
                            player.velocityX = 0;
                            player.velocityY = 0;
                        }
                    } else if (this.frisbee.isVisible && !this.frisbee.isFlying) {
                        // Chase loose frisbee
                        const dx = this.frisbee.x - player.x;
                        const dy = this.frisbee.y - player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance > 5) {
                            player.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED;
                            player.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED;
                        } else {
                            player.velocityX = 0;
                            player.velocityY = 0;
                        }
                    } else if (humanWithFrisbee) {
                        // Defensive: position between assigned player and frisbee holder to block passes
                        const humanPlayers = this.players.filter(p => p.team === 1);
                        const aiPlayers = this.players.filter(p => p.team === 2);
                        const aiIndex = aiPlayers.indexOf(player);
                        const targetHuman = humanPlayers[aiIndex % humanPlayers.length];
                        
                        if (targetHuman && targetHuman !== humanWithFrisbee) {
                            // Position between frisbee holder and assigned player
                            const midX = (humanWithFrisbee.x + targetHuman.x) / 2;
                            const midY = (humanWithFrisbee.y + targetHuman.y) / 2;
                            
                            const dx = midX - player.x;
                            const dy = midY - player.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance > 20) {
                                player.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.8;
                                player.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.8;
                            } else {
                                player.velocityX = 0;
                                player.velocityY = 0;
                            }
                        } else if (targetHuman === humanWithFrisbee) {
                            // If assigned to player with frisbee, pressure them directly
                            const dx = targetHuman.x - player.x;
                            const dy = targetHuman.y - player.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance > 30) {
                                player.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.9;
                                player.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.9;
                            } else {
                                player.velocityX = 0;
                                player.velocityY = 0;
                            }
                        }
                    } else if (aiWithFrisbee) {
                        // Offensive: spread out and avoid both defenders and teammates
                        const opponents = this.players.filter(p => p.team !== player.team);
                        const teammates = this.players.filter(p => p.team === player.team && p !== player);
                        
                        let targetX = 50; // Default toward goal
                        let targetY = CONFIG.CANVAS_HEIGHT / 2 + (Math.random() - 0.5) * 150; // Add some randomness
                        
                        // Avoid clustering with teammates
                        teammates.forEach(teammate => {
                            const dx = player.x - teammate.x;
                            const dy = player.y - teammate.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < 80) { // Too close to teammate
                                targetX += dx * 0.5;
                                targetY += dy * 0.5;
                            }
                        });
                        
                        // Check if passing lane to teammate with frisbee is blocked
                        const passingLaneBlocked = opponents.some(opponent => {
                            const distToLine = this.distanceToLine(aiWithFrisbee.x, aiWithFrisbee.y, player.x, player.y, opponent.x, opponent.y);
                            return distToLine < 25; // 25 pixel buffer for passing lane
                        });
                        
                        if (passingLaneBlocked) {
                            // Move perpendicular to the passing lane to get open
                            const dx = player.x - aiWithFrisbee.x;
                            const dy = player.y - aiWithFrisbee.y;
                            const perpX = -dy; // Perpendicular direction
                            const perpY = dx;
                            const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
                            
                            if (perpLength > 0) {
                                targetX += (perpX / perpLength) * 50;
                                targetY += (perpY / perpLength) * 50;
                            }
                        }
                        
                        // Avoid defenders
                        opponents.forEach(opponent => {
                            const dx = player.x - opponent.x;
                            const dy = player.y - opponent.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < 60) { // Too close to opponent
                                targetX += dx * 0.4;
                                targetY += dy * 0.4;
                            }
                        });
                        
                        const dx = targetX - player.x;
                        const dy = targetY - player.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance > 15) {
                            player.velocityX = (dx / distance) * CONFIG.PLAYER_SPEED * 0.7;
                            player.velocityY = (dy / distance) * CONFIG.PLAYER_SPEED * 0.7;
                        } else {
                            // Keep moving even when close to target
                            player.velocityX = (Math.random() - 0.5) * CONFIG.PLAYER_SPEED * 0.3;
                            player.velocityY = (Math.random() - 0.5) * CONFIG.PLAYER_SPEED * 0.3;
                        }
                    } else {
                        // No specific target, stay relatively still
                        player.velocityX = 0;
                        player.velocityY = 0;
                    }
                }
            }
            
            // Update throw timer for players with frisbee
            if (player.hasFrisbee) {
                if (!player.throwTimer) player.throwTimer = 0;
                player.throwTimer += deltaTime;
                
                // Force drop after 5 seconds
                if (player.throwTimer > 5) {
                    this.dropFrisbee(player);
                }
            }
            
            this.physics.updatePosition(player, deltaTime);
        });
    }

    updateFrisbee(deltaTime) {
        if (this.frisbee.isFlying) {
            const distance = Math.sqrt(
                (this.frisbee.targetX - this.frisbee.startX) ** 2 + 
                (this.frisbee.targetY - this.frisbee.startY) ** 2
            );
            const speed = 400; // pixels per second
            const progressIncrement = deltaTime * speed / distance;
            
            this.frisbee.flightProgress += progressIncrement;
            
            if (this.frisbee.flightProgress >= 1) {
                // Reached destination
                this.frisbee.x = this.frisbee.targetX;
                this.frisbee.y = this.frisbee.targetY;
                this.frisbee.isFlying = false;
                this.frisbee.flightProgress = 1;
            } else {
                // Interpolate position
                const t = this.frisbee.flightProgress;
                this.frisbee.x = this.frisbee.startX + (this.frisbee.targetX - this.frisbee.startX) * t;
                this.frisbee.y = this.frisbee.startY + (this.frisbee.targetY - this.frisbee.startY) * t;
            }
        }
    }

    updateTimer(deltaTime) {
        const currentTime = this.gameState.getState('gameTime');
        const newTime = Math.max(0, currentTime - deltaTime);
        this.gameState.setState('gameTime', newTime);
        
        if (newTime <= 0) {
            this.endGame();
        }
    }

    handleThrow(targetX, targetY) {
        const thrower = this.players.find(p => p.hasFrisbee);
        console.log('Throw attempt - thrower:', !!thrower, 'flying:', this.frisbee.isFlying);
        
        if (!thrower) {
            return;
        }
        
        // Check if clicking on a team 1 player (teammate)
        const clickedPlayer = this.players.find(p => 
            p.team === 1 && p !== thrower &&
            Math.abs(p.x - targetX) < CONFIG.PLAYER_SIZE && 
            Math.abs(p.y - targetY) < CONFIG.PLAYER_SIZE
        );
        
        if (clickedPlayer) {
            this.throwFrisbee(thrower, clickedPlayer.x, clickedPlayer.y);
        } else {
            this.throwFrisbee(thrower, targetX, targetY);
        }
    }

    throwFrisbee(thrower, targetX, targetY) {
        console.log('THROWING - from:', thrower.x, thrower.y, 'to:', targetX, targetY);
        
        this.frisbee.x = thrower.x;
        this.frisbee.y = thrower.y;
        this.frisbee.targetX = targetX;
        this.frisbee.targetY = targetY;
        this.frisbee.startX = thrower.x;
        this.frisbee.startY = thrower.y;
        this.frisbee.flightProgress = 0;
        this.frisbee.isFlying = true;
        this.frisbee.isVisible = true;
        this.frisbee.throwTime = performance.now();
        this.frisbee.throwerTeam = thrower.team; // Track who threw it
        
        thrower.hasFrisbee = false;
        thrower.throwTimer = 0; // Reset throw timer
        
        console.log('Frisbee state after throw:', {
            x: this.frisbee.x,
            y: this.frisbee.y,
            isFlying: this.frisbee.isFlying,
            isVisible: this.frisbee.isVisible,
            throwerTeam: this.frisbee.throwerTeam
        });
        
        try {
            this.audio.onThrow();
        } catch (e) {}
    }

    dropFrisbee(player) {
        // Player drops frisbee at their location
        this.frisbee.x = player.x;
        this.frisbee.y = player.y;
        this.frisbee.isFlying = false;
        this.frisbee.isVisible = true;
        this.frisbee.throwerTeam = player.team; // Mark as dropped by this team
        
        player.hasFrisbee = false;
        player.throwTimer = 0;
        
        console.log('Player', player.team, 'dropped frisbee due to 5-second rule');
    }

    checkCollisions() {
        // Check collisions for both flying and grounded frisbee
        if (!this.frisbee.isVisible) return;
        
        // If flying, only check collisions after minimum time delay (100ms) to avoid immediate catching
        if (this.frisbee.isFlying && performance.now() - this.frisbee.throwTime < 100) return;
        
        this.players.forEach(player => {
            // Use larger catch radius for teammates, smaller for opponents
            const isTeammate = this.frisbee.throwerTeam === player.team;
            const catchRadius = isTeammate ? CONFIG.PLAYER_SIZE * 0.8 : CONFIG.PLAYER_SIZE * 0.5;
            
            const dx = player.x - this.frisbee.x;
            const dy = player.y - this.frisbee.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < catchRadius) {
                // If frisbee is on ground, only opposing team can pick it up
                if (!this.frisbee.isFlying && this.frisbee.throwerTeam === player.team) {
                    return; // Same team can't pick up their own grounded throw
                }
                this.catchFrisbee(player);
            }
        });
    }

    catchFrisbee(player) {
        // Clear any existing frisbee holder
        this.players.forEach(p => p.hasFrisbee = false);
        
        this.frisbee.isFlying = false;
        this.frisbee.isVisible = false;
        this.frisbee.x = player.x;
        this.frisbee.y = player.y;
        this.frisbee.velocityX = 0;
        this.frisbee.velocityY = 0;
        player.hasFrisbee = true;
        
        this.audio.onCatch();
        
        // Switch selected player if caught by human team
        if (player.team === 1) {
            this.players.forEach(p => p.isSelected = false);
            player.isSelected = true;
        }
    }

    checkScoring() {
        const playerWithFrisbee = this.players.find(p => p.hasFrisbee);
        if (!playerWithFrisbee) return;
        
        const inEndZone = (playerWithFrisbee.team === 1 && playerWithFrisbee.x > CONFIG.CANVAS_WIDTH - CONFIG.END_ZONE_WIDTH) ||
                         (playerWithFrisbee.team === 2 && playerWithFrisbee.x < CONFIG.END_ZONE_WIDTH);
        
        if (inEndZone) {
            this.score(playerWithFrisbee.team);
        }
    }

    score(team) {
        const currentScore = this.gameState.getState('score');
        if (team === 1) {
            currentScore.team1++;
        } else {
            currentScore.team2++;
        }
        
        this.gameState.setState('score', currentScore);
        this.audio.onScore();
        
        // Reset positions
        this.resetPositions();
        
        // Check for game end
        if (currentScore.team1 >= CONFIG.SCORE_TO_WIN || currentScore.team2 >= CONFIG.SCORE_TO_WIN) {
            this.endGame();
        }
    }

    resetPositions() {
        this.createPlayers();
        this.createFrisbee();
    }

    endGame() {
        this.gameState.setState('currentScreen', 'gameOver');
        this.audio.onGameEnd();
        this.stopGameLoop();
    }

    distanceToLine(x1, y1, x2, y2, px, py) {
        // Calculate distance from point (px, py) to line segment (x1,y1)-(x2,y2)
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        
        if (lenSq === 0) return Math.sqrt(A * A + B * B);
        
        const param = dot / lenSq;
        let xx, yy;
        
        if (param < 0) {
            xx = x1;
            yy = y1;
        } else if (param > 1) {
            xx = x2;
            yy = y2;
        } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }
        
        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    render() {
        const currentScreen = this.gameState.getState('currentScreen');
        // console.log('Rendering screen:', currentScreen);
        
        if (currentScreen === 'menu') {
            this.renderer.drawMenu();
        } else {
            this.renderer.clear();
            this.renderer.drawField();
            
            // console.log('Drawing', this.players.length, 'players');
            this.players.forEach((player, index) => {
                // console.log(`Drawing player ${index}, team ${player.team}, position (${player.x}, ${player.y})`);
                this.renderer.drawPlayer(player);
            });
            
            this.renderer.drawFrisbee(this.frisbee);
            this.renderer.drawUI(this.gameState);
        }
    }
}