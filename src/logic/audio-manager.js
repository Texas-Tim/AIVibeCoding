/**
 * Audio Manager for sound effects and music
 */
export class AudioManager {
    constructor(assetLoader) {
        this.assetLoader = assetLoader;
        this.sounds = new Map();
        this.music = null;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.masterVolume = 1.0;
        this.soundVolume = 0.7;
        this.musicVolume = 0.3;
    }

    async initialize() {
        // Initialize Web Audio API for programmatic sounds
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // Try to load background music file
            await this.loadBackgroundMusic();
        } catch (error) {
            console.warn('Web Audio API not supported', error);
            this.audioContext = null;
        }
    }
    
    async loadBackgroundMusic() {
        console.log('🎵 Checking browser permissions and loading music...');
        console.log('Location:', window.location.href);
        console.log('Protocol:', window.location.protocol);
        
        // Check if running from file:// protocol
        if (window.location.protocol === 'file:') {
            console.warn('⚠️ Running from file:// protocol - audio may not load');
            console.log('💡 Try running from http://localhost instead');
        }
        
        try {
            console.log('🔍 Trying MP3 file...');
            this.music = new Audio('assets/audio/background-music.mp3');
            this.music.loop = true;
            this.music.volume = this.masterVolume * this.musicVolume;
            
            // Add detailed error logging
            this.music.addEventListener('error', (e) => {
                console.error('❌ MP3 Error details:', {
                    error: e.target.error,
                    networkState: e.target.networkState,
                    readyState: e.target.readyState,
                    src: e.target.src
                });
            });
            
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('MP3 load timeout'));
                }, 3000);
                
                this.music.addEventListener('canplaythrough', () => {
                    clearTimeout(timeout);
                    resolve();
                }, { once: true });
                
                this.music.addEventListener('error', (e) => {
                    clearTimeout(timeout);
                    reject(e);
                }, { once: true });
                
                this.music.load();
            });
            
            console.log('✅ MP3 background music loaded successfully');
            
        } catch (error) {
            console.warn('❌ MP3 failed, trying WAV:', error.message);
            
            try {
                console.log('🔍 Trying WAV file...');
                this.music = new Audio('assets/audio/background-music.wav');
                this.music.loop = true;
                this.music.volume = this.masterVolume * this.musicVolume;
                
                this.music.addEventListener('error', (e) => {
                    console.error('❌ WAV Error details:', {
                        error: e.target.error,
                        networkState: e.target.networkState,
                        readyState: e.target.readyState,
                        src: e.target.src
                    });
                });
                
                await new Promise((resolve, reject) => {
                    const timeout = setTimeout(() => {
                        reject(new Error('WAV load timeout'));
                    }, 3000);
                    
                    this.music.addEventListener('canplaythrough', () => {
                        clearTimeout(timeout);
                        resolve();
                    }, { once: true });
                    
                    this.music.addEventListener('error', (e) => {
                        clearTimeout(timeout);
                        reject(e);
                    }, { once: true });
                    
                    this.music.load();
                });
                
                console.log('✅ WAV background music loaded successfully');
                
            } catch (wavError) {
                console.error('❌ Both MP3 and WAV failed:', wavError.message);
                console.log('💡 Suggestions:');
                console.log('- Check if files exist in assets/audio/');
                console.log('- Ensure running from http://localhost (not file://)');
                console.log('- Check browser console for CORS errors');
                console.log('- Verify audio file formats are supported');
                this.music = null;
            }
        }
    }
    
    createProgrammaticMusic() {
        if (!this.audioContext) return;
        
        this.musicGainNode = this.audioContext.createGain();
        this.musicGainNode.connect(this.audioContext.destination);
        this.musicGainNode.gain.setValueAtTime(this.masterVolume * this.musicVolume * 0.1, this.audioContext.currentTime);
        
        this.music = {
            playing: false,
            paused: false,
            volume: this.masterVolume * this.musicVolume,
            play: () => this.startProgrammaticMusic(),
            pause: () => this.stopProgrammaticMusic(),
            currentTime: 0,
            loop: true
        };
        
        console.log('✅ Programmatic background music ready');
    }
    
    startProgrammaticMusic() {
        if (!this.audioContext || this.music.playing) return;
        
        this.music.playing = true;
        this.playMelodyLoop();
    }
    
    stopProgrammaticMusic() {
        this.music.playing = false;
        if (this.melodyTimeout) {
            clearTimeout(this.melodyTimeout);
        }
    }
    
    playMelodyLoop() {
        if (!this.music.playing) return;
        
        const melody = [262, 294, 330, 349, 392, 440, 494, 523];
        const rhythm = [0.5, 0.5, 0.5, 0.5, 1, 0.5, 0.5, 1];
        
        let noteIndex = 0;
        const playNote = () => {
            if (!this.music.playing) return;
            
            const freq = melody[noteIndex % melody.length];
            const duration = rhythm[noteIndex % rhythm.length] * 0.3;
            
            const oscillator = this.audioContext.createOscillator();
            const noteGain = this.audioContext.createGain();
            
            oscillator.connect(noteGain);
            noteGain.connect(this.musicGainNode);
            
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            oscillator.type = 'square';
            
            noteGain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            noteGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
            
            noteIndex++;
            this.melodyTimeout = setTimeout(playNote, duration * 1000);
        };
        
        playNote();
    }

    playSound(soundName, volume = 1.0) {
        if (!this.soundEnabled || !this.audioContext) return;
        
        try {
            const finalVolume = this.masterVolume * this.soundVolume * volume;
            
            switch (soundName) {
                case 'throw':
                    this.playThrowSound(finalVolume);
                    break;
                case 'catch':
                    this.playCatchSound(finalVolume);
                    break;
                case 'score':
                    this.playScoreSound(finalVolume);
                    break;
                case 'whistle':
                    this.playWhistleSound(finalVolume);
                    break;
            }
        } catch (error) {
            console.warn(`Error playing sound: ${soundName}`, error);
        }
    }
    
    playThrowSound(volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.2);
    }
    
    playCatchSound(volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(volume * 0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
    
    playScoreSound(volume) {
        // Play a celebratory ascending tone
        const frequencies = [262, 330, 392, 523]; // C, E, G, C
        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime + index * 0.1);
            gainNode.gain.setValueAtTime(volume * 0.2, this.audioContext.currentTime + index * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + index * 0.1 + 0.2);
            
            oscillator.start(this.audioContext.currentTime + index * 0.1);
            oscillator.stop(this.audioContext.currentTime + index * 0.1 + 0.2);
        });
    }
    
    playWhistleSound(volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(volume * 0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    playMusic() {
        if (!this.musicEnabled || !this.music) {
            console.log('🔇 Music disabled or not loaded');
            return;
        }
        
        try {
            this.music.volume = this.masterVolume * this.musicVolume;
            console.log(`🎵 Attempting to play music at volume: ${this.music.volume}`);
            
            this.music.play().then(() => {
                console.log('✅ Background music started playing');
            }).catch(error => {
                console.warn('❌ Failed to play background music:', error.message);
                if (error.name === 'NotAllowedError') {
                    console.log('💡 User interaction required - music will start after first click');
                }
            });
        } catch (error) {
            console.warn('Error playing background music', error);
        }
    }

    stopMusic() {
        if (this.music) {
            try {
                this.music.pause();
                this.music.currentTime = 0;
            } catch (error) {
                console.warn('Error stopping background music', error);
            }
        }
    }

    pauseMusic() {
        if (this.music) {
            try {
                this.music.pause();
            } catch (error) {
                console.warn('Error pausing background music', error);
            }
        }
    }

    resumeMusic() {
        if (this.musicEnabled && this.music) {
            try {
                this.music.play().catch(error => {
                    console.warn('Failed to resume background music', error);
                });
            } catch (error) {
                console.warn('Error resuming background music', error);
            }
        }
    }

    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }

    setMusicEnabled(enabled) {
        this.musicEnabled = enabled;
        if (!enabled) {
            this.stopMusic();
        } else {
            this.playMusic();
        }
    }

    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.music) {
            this.music.volume = this.masterVolume * this.musicVolume;
        }
    }

    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.music) {
            this.music.volume = this.masterVolume * this.musicVolume;
        }
    }


    // Game event handlers
    onThrow() {
        this.playSound('throw');
    }

    onCatch() {
        this.playSound('catch');
    }

    onScore() {
        this.playSound('score', 1.2);
    }

    onGameStart() {
        this.playSound('whistle');
        this.playMusic();
    }

    onGameEnd() {
        this.playSound('whistle');
        this.stopMusic();
    }

    onGamePause() {
        this.pauseMusic();
    }

    onGameResume() {
        this.resumeMusic();
    }
    
    // Call this after first user interaction to enable audio
    enableAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(() => {
                console.log('✅ Audio context resumed');
            });
        }
        
        // Try to play music if it failed before
        if (this.musicEnabled && this.music && this.music.paused) {
            this.playMusic();
        }
    }
}