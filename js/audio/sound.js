function helloSound() {
    console.log("🔊 Sound & Effects ready");
}

window.SoundManager = {
    sounds: {},
    loadedCount: 0,
    totalSounds: 0,
    onComplete: null,
    
    // Регистрация одного звука
    registerSound: function(name, path) {
        this.totalSounds++;
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => {
            this.loadedCount++;
            console.log(`✅ Sound loaded: ${name} (${this.loadedCount}/${this.totalSounds})`);
            if(this.loadedCount === this.totalSounds && this.onComplete) {
                console.log("🔊 All sounds ready!");
                this.onComplete();
            }
        });
        audio.onerror = () => {
            console.error(`❌ Failed to load sound: ${name}`);
            this.loadedCount++;
        };
        audio.src = path;
        audio.load();
        this.sounds[name] = audio;
    },
    
    // НОВЫЙ МЕТОД: массовая загрузка
    loadAll: function(soundsList, callback) {
        this.onComplete = callback;
        const names = Object.keys(soundsList);
        this.totalSounds = names.length;
        this.loadedCount = 0;
        
        for(let i = 0; i < names.length; i++) {
            const name = names[i];
            const path = soundsList[name];
            this.registerSound(name, path);
        }
    },
    
    // Воспроизведение звука
    play: function(name) {
        const sound = this.sounds[name];
        if(sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("Audio error:", e));
        } else {
            console.warn(`⚠️ Sound not found: ${name}`);
        }
    },
    
    // НОВЫЙ МЕТОД: фоновая музыка с зацикливанием
    // Добавить проверку на зацикливание, если файл уже играет
    playMusic: function(name, volume = 0.3) {
        const music = this.sounds[name];
        if(music) {
            if (!music.paused) {
                music.pause();
                music.currentTime = 0;
            }
            music.loop = true;
            music.volume = volume;
            music.play().catch(e => console.log("Music error:", e));
       } 
       else {
            console.warn(`⚠️ Music track not found: ${name}`);
       }
 

    },
    
    // НОВЫЙ МЕТОД: остановка музыки
    stopMusic: function(name) {
        const music = this.sounds[name];
        if(music) {
            music.pause();
            music.currentTime = 0;
        }
    },
    
    // Установка громкости
    setVolume: function(name, volume) {
        const sound = this.sounds[name];
        if(sound) {
            sound.volume = Math.max(0, Math.min(1, volume));
        }
    },
        // Добавить в SoundManager
    playDayMusic: function() {
        if(this.currentDayMusic) this.stopMusic(this.currentDayMusic);
        this.currentDayMusic = 'ambient_day';
        this.playMusic('ambient_day', 0.3);
    },
    
    playNightMusic: function() {
        if(this.currentDayMusic) this.stopMusic(this.currentDayMusic);
        this.currentDayMusic = 'ambient_night';
        this.playMusic('ambient_night', 0.25);
    },
    
    isNightTime: function(dayTimer, dayDuration) {
        return dayTimer > dayDuration * 0.6; // Ночь начинается с 60% дня
    },
    playDayMusic: function() {
        if(this.currentDayMusic) this.stopMusic(this.currentDayMusic);
        this.currentDayMusic = 'ambient_day';
        this.playMusic('ambient_day', 0.3);
    },
    playNightMusic: function() {
        if(this.currentDayMusic) this.stopMusic(this.currentDayMusic);
        this.currentDayMusic = 'ambient_night';
        this.playMusic('ambient_night', 0.25);
    },
    isNightTime: function(dayTimer, dayDuration) {
        return dayTimer > dayDuration * 0.6; // Ночь начинается с 60% дня
    }

};

helloSound();

class SoundManager {
    constructor() {
        // Хранилище звуков
        this.sounds = new Map();
        // Счетчики загрузки
        this.loadedCount = 0;
        this.totalSounds = 0;
        // Колбэк завершения загрузки
        this.onComplete = null;
        // Текущая фоновая музыка
        this.currentMusic = null;
    }
    
    loadAll(soundsList, callback) {
        this.onComplete = callback;
        const entries = Object.entries(soundsList);
        this.totalSounds = entries.length;
        this.loadedCount = 0;
        
        for (let i = 0; i < entries.length; i++) {
            const name = entries[i][0];
            const path = entries[i][1];
            this.loadSound(name, path);
        }
    }
    
    loadSound(name, path) {
        const audio = new Audio();
        const self = this;
        
        audio.addEventListener('canplaythrough', function() {
            self.loadedCount++;
            console.log(`✅ Sound loaded: ${name} (${self.loadedCount}/${self.totalSounds})`);
            if (self.loadedCount === self.totalSounds && self.onComplete) {
                console.log("🔊 All sounds ready!");
                self.onComplete();
            }
        });
        
        audio.onerror = function() {
            console.error(`❌ Failed to load sound: ${name}`);
            self.loadedCount++;
        };
        
        audio.src = path;
        audio.load();
        this.sounds.set(name, audio);
    }
    
    play(name) {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.currentTime = 0;  // перематываем в начало
            sound.play().catch(e => console.log("Audio error:", e));
        } else {
            console.warn(`⚠️ Sound not found: ${name}`);
        }
    }
    
    playMusic(name, volume = 0.3) {
        // Останавливаем текущую музыку
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
        
        const music = this.sounds.get(name);
        if (music) {
            music.loop = true;      // зацикливаем
            music.volume = volume;   // устанавливаем громкость
            music.play().catch(e => console.log("Music error:", e));
            this.currentMusic = music;
        } else {
            console.warn(`⚠️ Music track not found: ${name}`);
        }
    }
    
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
            this.currentMusic = null;
        }
    }
}

window.soundManager = new SoundManager();
