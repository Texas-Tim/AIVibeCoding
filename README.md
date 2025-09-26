# Ultimate Frisbee Arcade Game

An 8-bit style Ultimate Frisbee arcade game featuring 3v3 gameplay with AI opponents.

## Features

- **8-bit Graphics**: Retro pixel art style with 16x16 sprites
- **3v3 Gameplay**: Human team vs AI opponents
- **Smart AI**: Computer opponents with offensive and defensive strategies
- **Audio**: Sound effects and background music (AWS Bedrock generated)
- **Game Modes**: Menu, gameplay, pause, and game over screens
- **Settings**: Configurable sound, music, and difficulty levels
- **Local Storage**: Persistent game settings

## Controls

- **WASD** or **Arrow Keys**: Move selected player
- **Mouse Click**: Throw frisbee to target location
- **Space**: Start game, pause/resume
- **R**: Restart game (on game over screen)
- **Esc**: Pause game

## Game Rules

- Score by reaching the opponent's end zone with the frisbee
- 3-minute game sessions
- First to 7 points or highest score at time expiration wins
- Players can only move when they have the frisbee or are defending

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open http://localhost:1234 in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── core/                 # Foundation components
│   ├── local-storage.js  # Data persistence
│   ├── asset-loader.js   # Resource loading
│   └── game-state.js     # State management
├── logic/                # Game logic
│   ├── physics-engine.js # Physics and collisions
│   ├── ai-controller.js  # AI behavior
│   └── audio-manager.js  # Sound management
├── presentation/         # Rendering and input
│   ├── canvas-renderer.js # Graphics rendering
│   └── input-handler.js  # Input processing
├── controllers/          # Game orchestration
│   └── game-controller.js
├── ui/                   # User interface
│   └── ui-controller.js
├── config.js            # Game configuration
└── main.js              # Application entry point
```

## Assets

Place game assets in the following directories:

- `assets/sprites/` - PNG sprite files (16x16 pixels recommended)
- `assets/audio/` - MP3 audio files
- `assets/styles/` - CSS files

## Technology Stack

- **Framework**: Vanilla JavaScript with ES6 modules
- **Build Tool**: Parcel (zero-configuration bundling)
- **Testing**: Jest with jsdom
- **Code Quality**: ESLint + Prettier
- **Graphics**: HTML5 Canvas with 2D context

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

MIT License - see LICENSE file for details.

## Development Notes

This game was built using the AI-DLC (AI Development Life Cycle) methodology, ensuring comprehensive requirements analysis, user story development, and systematic code generation.