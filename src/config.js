/**
 * Game Configuration
 */
export const CONFIG = {
    // Canvas settings
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    TARGET_FPS: 60,

    // Field dimensions
    FIELD_WIDTH: 700,
    FIELD_HEIGHT: 500,
    END_ZONE_WIDTH: 100,

    // Player settings
    PLAYER_SIZE: 16,
    PLAYER_SPEED: 120, // pixels per second
    TEAM_SIZE: 3,

    // Frisbee settings
    FRISBEE_SIZE: 8,
    FRISBEE_SPEED: 200,
    THROW_POWER_MAX: 300,

    // Game settings
    GAME_DURATION: 180, // 3 minutes
    SCORE_TO_WIN: 7,

    // Physics
    FRICTION: 0.95,
    COLLISION_DISTANCE: 20,

    // Colors (8-bit palette)
    COLORS: {
        FIELD: '#2a5d31',
        END_ZONE: '#1a4d21',
        FIELD_LINES: '#ffffff',
        TEAM1: '#ff4444',
        TEAM2: '#4444ff',
        FRISBEE: '#ffff44',
        UI_TEXT: '#ffffff',
        UI_BACKGROUND: '#000000'
    },

    // Asset paths
    ASSETS: {
        SPRITES: {
            PLAYER_TEAM1: 'assets/sprites/player-red.png',
            PLAYER_TEAM2: 'assets/sprites/player-blue.png',
            FRISBEE: 'assets/sprites/frisbee.png',
            FIELD_MARKER: 'assets/sprites/field-marker.png'
        },
        AUDIO: {
            THROW: 'assets/audio/throw.mp3',
            CATCH: 'assets/audio/catch.mp3',
            SCORE: 'assets/audio/score.mp3',
            WHISTLE: 'assets/audio/whistle.mp3',
            BACKGROUND_MUSIC: 'assets/audio/background-music.mp3'
        }
    }
};