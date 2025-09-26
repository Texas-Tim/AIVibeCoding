# Asset Generation Guide

This guide explains how to generate the required sprite and audio assets for the Ultimate Frisbee Arcade Game using AWS Bedrock.

## Prerequisites

- AWS CLI configured with appropriate permissions
- Access to AWS Bedrock image and audio generation models
- Python 3.x installed

## Step 1: Generate Assets with Bedrock

Run the asset generation script:

```bash
./generate-assets.sh
```

This script will:
- Generate 8-bit sprite images (16x16 for players, 8x8 for frisbee)
- Generate retro arcade audio effects and background music
- Save Bedrock responses as JSON files

## Step 2: Extract Assets

Run the extraction script to convert base64 data to usable files:

```bash
python3 extract-assets.py
```

This will create:
- `assets/sprites/player-red.png` - Red team player sprite
- `assets/sprites/player-blue.png` - Blue team player sprite  
- `assets/sprites/frisbee.png` - Frisbee sprite
- `assets/audio/throw.mp3` - Throw sound effect
- `assets/audio/catch.mp3` - Catch sound effect
- `assets/audio/score.mp3` - Score sound effect
- `assets/audio/whistle.mp3` - Game start/end whistle
- `assets/audio/background.mp3` - Background music

## Alternative: Manual Generation

If the scripts don't work with your Bedrock setup, you can manually generate assets using these prompts:

### Image Generation Prompts

**Red Player Sprite:**
```
8-bit pixel art sprite of a red ultimate frisbee player, 16x16 pixels, retro arcade game style, transparent background, simple geometric shapes, red jersey, facing forward, minimalist design
```

**Blue Player Sprite:**
```
8-bit pixel art sprite of a blue ultimate frisbee player, 16x16 pixels, retro arcade game style, transparent background, simple geometric shapes, blue jersey, facing forward, minimalist design
```

**Frisbee Sprite:**
```
8-bit pixel art sprite of a yellow frisbee disc, 8x8 pixels, retro arcade game style, transparent background, simple circular shape, bright yellow color, top-down view
```

### Audio Generation Prompts

**Throw Sound:**
```
Generate a short 8-bit retro arcade game sound effect for throwing a frisbee. Should be a quick whoosh sound lasting about 0.5 seconds, with a digital/chiptune style reminiscent of classic arcade games.
```

**Catch Sound:**
```
Generate a short 8-bit retro arcade game sound effect for catching a frisbee. Should be a satisfying pop or snap sound lasting about 0.3 seconds, with a digital/chiptune style reminiscent of classic arcade games.
```

**Score Sound:**
```
Generate a celebratory 8-bit retro arcade game sound effect for scoring a point. Should be an uplifting chime or fanfare lasting about 1 second, with a digital/chiptune style reminiscent of classic arcade games.
```

**Whistle Sound:**
```
Generate a short 8-bit retro arcade game whistle sound effect for game start and end. Should be a sharp tweet lasting about 0.5 seconds, with a digital/chiptune style reminiscent of classic arcade games.
```

**Background Music:**
```
Generate upbeat 8-bit retro arcade background music for an ultimate frisbee game. Should be energetic and looping, about 30 seconds long, with a digital/chiptune style reminiscent of classic arcade games. Include a catchy melody that maintains excitement during gameplay.
```

## Verification

After generating assets, verify they're properly placed:

```bash
ls -la assets/sprites/
ls -la assets/audio/
```

You should see all required PNG and MP3 files.

## Testing

Run the game to test the assets:

```bash
npm run dev
```

The game should now display custom sprites and play generated audio effects.

## Troubleshooting

- If Bedrock model IDs are different, update them in `generate-assets.sh`
- If response structure differs, modify `extract-assets.py` accordingly
- For missing assets, the game will use fallback colored rectangles and no audio
- Check browser console for asset loading errors