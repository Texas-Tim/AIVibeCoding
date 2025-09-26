import { CONFIG } from '../config.js';

/**
 * Canvas Renderer for game graphics
 */
export class CanvasRenderer {
    constructor(canvas, assetLoader) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.assetLoader = assetLoader;
        
        // Set canvas size
        this.canvas.width = CONFIG.CANVAS_WIDTH;
        this.canvas.height = CONFIG.CANVAS_HEIGHT;
        
        // Disable image smoothing for pixel-perfect 8-bit graphics
        this.ctx.imageSmoothingEnabled = false;
    }

    clear() {
        this.ctx.fillStyle = CONFIG.COLORS.FIELD;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawField() {
        // Draw field background
        this.ctx.fillStyle = CONFIG.COLORS.FIELD;
        this.ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Draw end zones
        this.ctx.fillStyle = CONFIG.COLORS.END_ZONE;
        this.ctx.fillRect(0, 0, CONFIG.END_ZONE_WIDTH, CONFIG.CANVAS_HEIGHT);
        this.ctx.fillRect(CONFIG.CANVAS_WIDTH - CONFIG.END_ZONE_WIDTH, 0, CONFIG.END_ZONE_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Draw field lines
        this.ctx.strokeStyle = CONFIG.COLORS.FIELD_LINES;
        this.ctx.lineWidth = 2;
        
        // End zone lines
        this.ctx.beginPath();
        this.ctx.moveTo(CONFIG.END_ZONE_WIDTH, 0);
        this.ctx.lineTo(CONFIG.END_ZONE_WIDTH, CONFIG.CANVAS_HEIGHT);
        this.ctx.moveTo(CONFIG.CANVAS_WIDTH - CONFIG.END_ZONE_WIDTH, 0);
        this.ctx.lineTo(CONFIG.CANVAS_WIDTH - CONFIG.END_ZONE_WIDTH, CONFIG.CANVAS_HEIGHT);
        this.ctx.stroke();
        
        // Center line
        this.ctx.beginPath();
        this.ctx.moveTo(CONFIG.CANVAS_WIDTH / 2, 0);
        this.ctx.lineTo(CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT);
        this.ctx.stroke();
    }

    drawPlayer(player) {
        // Draw player sprite with transparent background
        this.drawPlayerSprite(player);
        
        // Draw player number
        this.ctx.fillStyle = CONFIG.COLORS.UI_TEXT;
        this.ctx.font = '10px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            player.number.toString(),
            player.x,
            player.y - CONFIG.PLAYER_SIZE / 2 - 5
        );
        
        // Highlight player with frisbee
        if (player.hasFrisbee) {
            this.ctx.strokeStyle = CONFIG.COLORS.FRISBEE;
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(
                player.x - CONFIG.PLAYER_SIZE / 2 - 2,
                player.y - CONFIG.PLAYER_SIZE / 2 - 2,
                CONFIG.PLAYER_SIZE + 4,
                CONFIG.PLAYER_SIZE + 4
            );
        }
    }

    drawPlayerSprite(player) {
        const spriteName = player.team === 1 ? 'player-team1' : 'player-team2';
        const sprite = this.assetLoader.getAsset(spriteName);
        
        if (sprite) {
            // Draw sprite with transparent background support
            this.ctx.drawImage(
                sprite,
                player.x - CONFIG.PLAYER_SIZE / 2,
                player.y - CONFIG.PLAYER_SIZE / 2,
                CONFIG.PLAYER_SIZE,
                CONFIG.PLAYER_SIZE
            );
        } else {
            // Fallback to colored rectangle if sprite not loaded
            this.ctx.fillStyle = player.team === 1 ? CONFIG.COLORS.TEAM1 : CONFIG.COLORS.TEAM2;
            this.ctx.fillRect(
                player.x - CONFIG.PLAYER_SIZE / 2,
                player.y - CONFIG.PLAYER_SIZE / 2,
                CONFIG.PLAYER_SIZE,
                CONFIG.PLAYER_SIZE
            );
        }
    }

    drawFrisbee(frisbee) {
        console.log('Drawing frisbee - visible:', frisbee.isVisible, 'flying:', frisbee.isFlying, 'pos:', frisbee.x, frisbee.y);
        
        if (!frisbee.isVisible) return;
        
        const sprite = this.assetLoader.getAsset('frisbee');
        
        if (sprite) {
            this.ctx.drawImage(
                sprite,
                frisbee.x - CONFIG.FRISBEE_SIZE / 2,
                frisbee.y - CONFIG.FRISBEE_SIZE / 2,
                CONFIG.FRISBEE_SIZE,
                CONFIG.FRISBEE_SIZE
            );
        } else {
            // Fallback to colored circle
            this.ctx.fillStyle = CONFIG.COLORS.FRISBEE;
            this.ctx.beginPath();
            this.ctx.arc(frisbee.x, frisbee.y, CONFIG.FRISBEE_SIZE / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw trajectory line when flying
        if (frisbee.isFlying) {
            this.ctx.strokeStyle = CONFIG.COLORS.FRISBEE;
            this.ctx.lineWidth = 1;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(frisbee.startX, frisbee.startY);
            this.ctx.lineTo(frisbee.x, frisbee.y);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    drawUI(gameState) {
        const state = gameState.getState();
        
        // Draw score
        this.ctx.fillStyle = CONFIG.COLORS.UI_TEXT;
        this.ctx.font = '20px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            `${state.score.team1} - ${state.score.team2}`,
            CONFIG.CANVAS_WIDTH / 2,
            30
        );
        
        // Draw timer
        const minutes = Math.floor(state.gameTime / 60);
        const seconds = Math.floor(state.gameTime % 60);
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        this.ctx.fillText(timeString, CONFIG.CANVAS_WIDTH / 2, 55);
        
        // Draw game status
        if (state.currentScreen === 'pause') {
            this.drawPauseOverlay();
        } else if (state.currentScreen === 'gameOver') {
            this.drawGameOverOverlay(state);
        }
    }

    drawPauseOverlay() {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Pause text
        this.ctx.fillStyle = CONFIG.COLORS.UI_TEXT;
        this.ctx.font = '40px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSED', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2);
        
        this.ctx.font = '16px monospace';
        this.ctx.fillText('Press SPACE to resume', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2 + 40);
    }

    drawGameOverOverlay(state) {
        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
        
        // Game over text
        this.ctx.fillStyle = CONFIG.COLORS.UI_TEXT;
        this.ctx.font = '40px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2 - 40);
        
        // Winner announcement
        const winner = state.score.team1 > state.score.team2 ? 'Red Team' : 'Blue Team';
        this.ctx.font = '24px monospace';
        this.ctx.fillText(`${winner} Wins!`, CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2);
        
        // Final score
        this.ctx.font = '20px monospace';
        this.ctx.fillText(
            `Final Score: ${state.score.team1} - ${state.score.team2}`,
            CONFIG.CANVAS_WIDTH / 2,
            CONFIG.CANVAS_HEIGHT / 2 + 40
        );
        
        this.ctx.font = '16px monospace';
        this.ctx.fillText('Press R to restart', CONFIG.CANVAS_WIDTH / 2, CONFIG.CANVAS_HEIGHT / 2 + 80);
    }

    drawMenu() {
        this.clear();
        
        // Title
        this.ctx.fillStyle = CONFIG.COLORS.UI_TEXT;
        this.ctx.font = '48px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('ULTIMATE', CONFIG.CANVAS_WIDTH / 2, 80);
        this.ctx.fillText('FRISBEE', CONFIG.CANVAS_WIDTH / 2, 130);
        
        // Welcome message
        this.ctx.font = '16px monospace';
        this.ctx.fillStyle = '#88ff88';
        this.ctx.fillText('Welcome to the ultimate arcade frisbee experience!', CONFIG.CANVAS_WIDTH / 2, 165);
        this.ctx.fillStyle = CONFIG.COLORS.UI_TEXT;
        
        // Controls section
        this.ctx.font = '20px monospace';
        this.ctx.fillText('CONTROLS', CONFIG.CANVAS_WIDTH / 2, 200);
        
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'left';
        const leftCol = 200;
        const rightCol = 500;
        let y = 240;
        
        // Movement controls
        this.ctx.fillText('MOVEMENT:', leftCol, y);
        this.ctx.fillText('WASD or Arrow Keys', rightCol, y);
        y += 25;
        
        // Throwing
        this.ctx.fillText('THROW FRISBEE:', leftCol, y);
        this.ctx.fillText('Click target location', rightCol, y);
        y += 25;
        
        // Game controls
        this.ctx.fillText('START GAME:', leftCol, y);
        this.ctx.fillText('SPACE', rightCol, y);
        y += 25;
        
        this.ctx.fillText('PAUSE/RESUME:', leftCol, y);
        this.ctx.fillText('SPACE or ESC', rightCol, y);
        y += 25;
        
        this.ctx.fillText('RESTART GAME:', leftCol, y);
        this.ctx.fillText('R', rightCol, y);
        y += 25;
        
        this.ctx.fillText('MAIN MENU:', leftCol, y);
        this.ctx.fillText('M', rightCol, y);
        y += 25;
        
        this.ctx.fillText('SELECT PLAYER:', leftCol, y);
        this.ctx.fillText('1, 2, 3', rightCol, y);
        y += 40;
        
        // Game rules
        this.ctx.font = '16px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('OBJECTIVE: Score by reaching opponent\'s end zone with frisbee', CONFIG.CANVAS_WIDTH / 2, y);
        y += 25;
        this.ctx.fillText('3 minutes • First to 7 points wins', CONFIG.CANVAS_WIDTH / 2, y);
        y += 40;
        
        // Start instruction
        this.ctx.font = '18px monospace';
        this.ctx.fillStyle = '#ffff44';
        this.ctx.fillText('Press SPACE to start!', CONFIG.CANVAS_WIDTH / 2, y);
    }
}