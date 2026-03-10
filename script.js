// Music Player Application with Real Audio Playback
document.addEventListener('DOMContentLoaded', function() {
    createAudioElement();
    initializePlayer();
    initializeNavigation();
    initializeSidebar();
    initializeButtons();
    showSetupInstructions();
});

// ====== AUDIO ELEMENT ======
let audioElement;

function createAudioElement() {
    audioElement = new Audio();
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', autoNextSong);
    audioElement.addEventListener('loadedmetadata', updateDurationDisplay);
    audioElement.addEventListener('error', handleAudioError);
}

function handleAudioError(error) {
    console.error('❌ Audio Error:', error);
    console.log('%c📁 HOW TO FIX:', 'color: orange; font-size: 14px; font-weight: bold;');
    console.log('1. Get an MP3 file (download from YouTube, Pixabay, or use your own)');
    console.log('2. Place it in: c:\\...\\spotify-colne\\your-song.mp3');
    console.log('3. Edit script.js line ~40 and change url: to "your-song.mp3"');
    console.log('4. Save file and refresh browser');
    console.log('%c📖 See FIX_CORS_ERROR.md for detailed instructions', 'color: blue; text-decoration: underline;');
}

function showSetupInstructions() {
    console.log('%c🎵 SPOTIFY CLONE AUDIO SETUP', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cHow to play real music:', 'color: blue; font-size: 12px; font-weight: bold;');
    console.log('Option 1: Use LOCAL MP3 files (RECOMMENDED) ⭐');
    console.log('  - Get an MP3 file');
    console.log('  - Place in spotify-colne folder');
    console.log('  - Edit script.js: url: "your-song.mp3"');
    console.log('  - Refresh browser - Music plays!');
    console.log('');
    console.log('Option 2: Use online music (CORS-friendly sources)');
    console.log('  - Pixabay, Zapsplat, or Archive.org');  
    console.log('  - Update URL in songs array');
    console.log('');
    console.log('📖 For full guide, see: FIX_CORS_ERROR.md');
}

// ====== PLAYER FUNCTIONALITY ======
let isPlaying = false;
let volume = 100;
let songs = [
    { 
        title: 'Song 1',
        singer: 'Add Your Music',
        duration: '03:26',
        url: 'dkfilms-doraemon-hindi-rampb-pop-song-383334.mp3'  // 👈 Replace with your MP3 filename
    },
    { 
        title: 'Song 2',
        singer: 'Add Your Music',
        duration: '03:20',
        url: 'bantigg-sapne-bade-305719.mp3'  // 👈 Replace with your MP3 filename
    },
    { 
        title: 'Song 3',
        singer: 'Add Your Music',
        duration: '02:47',
        url: 'musiclaundry-khwaab-ka-musafir-romantic-hindi-song-ai-music-original-lyrics-477286.mp3'  // 👈 Replace with your MP3 filename
    },
    { 
        title: 'Song 4',
        singer: 'Add Your Music',
        duration: '03:59',
        url: 'song4.mp3'  // 👈 Replace with your MP3 filename
    },
    { 
        title: 'Song 5',
        singer: 'Add Your Music',
        duration: '03:20',
        url: 'song5.mp3'  // 👈 Replace with your MP3 filename
    }
];
let currentSongIndex = 0;

function initializePlayer() {
    const playBtn = document.querySelector('.tri');
    const prevBtn = document.querySelector('.control-icon.at:nth-child(1)');
    const nextBtn = document.querySelector('.control-icon.at:nth-child(5)');
    const progressBar = document.querySelector('.pro-bar');
    const volumeSlider = document.querySelector('.voll-pro');
    const likeBtn = document.querySelector('.ll-cent i:first-child');
    
    // Play/Pause button
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
        playBtn.style.cursor = 'pointer';
    }
    
    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', previousSong);
        prevBtn.style.cursor = 'pointer';
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSong);
        nextBtn.style.cursor = 'pointer';
    }
    
    // Progress bar
    if (progressBar) {
        progressBar.addEventListener('input', seekSong);
    }
    
    // Volume slider
    if (volumeSlider) {
        volumeSlider.addEventListener('input', changeVolume);
    }
    
    // Like button
    if (likeBtn) {
        likeBtn.addEventListener('click', toggleLike);
        likeBtn.style.cursor = 'pointer';
    }

    // Load initial song
    loadSong(currentSongIndex);
    updateSongDisplay();
}

function togglePlay() {
    isPlaying = !isPlaying;
    const playBtn = document.querySelector('.tri');
    const progressBar = document.querySelector('.pro-bar');
    const volumeSlider = document.querySelector('.voll-pro');
    
    if (!audioElement.src) {
        loadSong(currentSongIndex);
    }
    
    if (isPlaying) {
        audioElement.play().catch(error => {
            console.error('Error playing audio:', error);
            alert('Could not play audio. Check browser console for details.');
            isPlaying = false;
        });
        playBtn.style.opacity = '1';
        playBtn.style.filter = 'brightness(1)';
        // Add playing class to sliders
        if (progressBar) progressBar.classList.add('playing');
        if (volumeSlider) volumeSlider.classList.add('playing');
        console.log('Now playing: ' + songs[currentSongIndex].title);
    } else {
        audioElement.pause();
        playBtn.style.opacity = '0.7';
        playBtn.style.filter = 'brightness(0.7)';
        // Remove playing class from sliders
        if (progressBar) progressBar.classList.remove('playing');
        if (volumeSlider) volumeSlider.classList.remove('playing');
        console.log('Paused: ' + songs[currentSongIndex].title);
    }
}

function previousSong() {
    const wasPlaying = isPlaying;
    const progressBar = document.querySelector('.pro-bar');
    const volumeSlider = document.querySelector('.voll-pro');
    
    audioElement.pause();
    isPlaying = false;
    // Remove playing class from sliders
    if (progressBar) progressBar.classList.remove('playing');
    if (volumeSlider) volumeSlider.classList.remove('playing');
    
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    updateSongDisplay();
    if (wasPlaying) {
        audioElement.play();
        isPlaying = true;
        // Re-add playing class to sliders
        if (progressBar) progressBar.classList.add('playing');
        if (volumeSlider) volumeSlider.classList.add('playing');
    }
    console.log('Playing: ' + songs[currentSongIndex].title);
}

function nextSong() {
    const wasPlaying = isPlaying;
    const progressBar = document.querySelector('.pro-bar');
    const volumeSlider = document.querySelector('.voll-pro');
    
    audioElement.pause();
    isPlaying = false;
    // Remove playing class from sliders
    if (progressBar) progressBar.classList.remove('playing');
    if (volumeSlider) volumeSlider.classList.remove('playing');
    
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    updateSongDisplay();
    if (wasPlaying) {
        audioElement.play();
        isPlaying = true;
        // Re-add playing class to sliders
        if (progressBar) progressBar.classList.add('playing');
        if (volumeSlider) volumeSlider.classList.add('playing');
    }
    console.log('Playing: ' + songs[currentSongIndex].title);
}

function autoNextSong() {
    // Auto play next song when current ends
    const progressBar = document.querySelector('.pro-bar');
    const volumeSlider = document.querySelector('.voll-pro');
    
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    updateSongDisplay();
    audioElement.play();
    isPlaying = true;
    // Add playing class to sliders
    if (progressBar) progressBar.classList.add('playing');
    if (volumeSlider) volumeSlider.classList.add('playing');
    console.log('Auto-playing next: ' + songs[currentSongIndex].title);
}

function loadSong(index) {
    if (songs[index] && songs[index].url) {
        audioElement.src = songs[index].url;
        audioElement.load();
        console.log('Loaded: ' + songs[index].title);
    }
}

function updateSongDisplay() {
    const songElement = document.querySelector('.song');
    const singerElement = document.querySelector('.singer');
    if (songElement) songElement.textContent = songs[currentSongIndex].title;
    if (singerElement) singerElement.textContent = songs[currentSongIndex].singer;
    
    const totalTimeElement = document.querySelector('.tot-time');
    if (totalTimeElement) totalTimeElement.textContent = songs[currentSongIndex].duration;
    
    loadSong(currentSongIndex);
}

function seekSong(e) {
    if (audioElement.duration) {
        const newTime = (e.target.value / 100) * audioElement.duration;
        audioElement.currentTime = newTime;
    }
}

function updateProgress() {
    const progressBar = document.querySelector('.pro-bar');
    if (audioElement.duration && progressBar) {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressBar.value = percent;
    }
    updateTimeDisplay();
}

function updateDurationDisplay() {
    const totalTimeElement = document.querySelector('.tot-time');
    if (audioElement.duration && totalTimeElement) {
        const minutes = Math.floor(audioElement.duration / 60);
        const seconds = Math.floor(audioElement.duration % 60);
        const displayTime = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        totalTimeElement.textContent = displayTime;
    }
}

function updateTimeDisplay() {
    const minutes = Math.floor(audioElement.currentTime / 60);
    const seconds = Math.floor(audioElement.currentTime % 60);
    const displayTime = `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    const currTimeElement = document.querySelector('.curr-time');
    if (currTimeElement) currTimeElement.textContent = displayTime;
}

function changeVolume(e) {
    volume = e.target.value;
    audioElement.volume = volume / 100; // Audio API uses 0-1 range
    const volumeIcon = document.querySelector('.voll');
    if (volumeIcon) {
        if (volume == 0) {
            volumeIcon.classList.remove('fa-volume-high');
            volumeIcon.classList.add('fa-volume-mute');
        } else {
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-high');
        }
    }
}

function toggleLike() {
    const likeBtn = document.querySelector('.ll-cent i:first-child');
    if (likeBtn.classList.contains('fa-regular')) {
        likeBtn.classList.remove('fa-regular');
        likeBtn.classList.add('fa-solid');
        likeBtn.style.color = '#1bd760';
        console.log('Added to favorites: ' + songs[currentSongIndex].title);
    } else {
        likeBtn.classList.remove('fa-solid');
        likeBtn.classList.add('fa-regular');
        likeBtn.style.color = 'white';
        console.log('Removed from favorites: ' + songs[currentSongIndex].title);
    }
}

// ====== NAVIGATION ======
function initializeNavigation() {
    const backBtn = document.querySelector('.sticky-left img:first-child');
    const forwardBtn = document.querySelector('.sticky-left img:nth-child(2)');
    
    if (backBtn) {
        backBtn.style.cursor = 'pointer';
        backBtn.addEventListener('click', goBack);
    }
    
    if (forwardBtn) {
        forwardBtn.style.cursor = 'pointer';
        forwardBtn.addEventListener('click', goForward);
    }
}

function goBack() {
    console.log('Going back...');
    window.history.back();
}

function goForward() {
    console.log('Going forward...');
    window.history.forward();
}

// ====== SIDEBAR ======
function initializeSidebar() {
    const homeBtn = document.querySelector('.nav-option');
    const createPlaylistBtn = document.querySelector('.badge');
    const browsePodcastBtn = document.querySelector('.badge:nth-of-type(2)');
    
    if (homeBtn) {
        homeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Home clicked');
        });
    }
    
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', createPlaylist);
    }
    
    if (browsePodcastBtn) {
        browsePodcastBtn.addEventListener('click', browsePodcasts);
    }
}

function createPlaylist() {
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
        console.log('Playlist created: ' + playlistName);
        alert('Playlist "' + playlistName + '" created successfully!');
    }
}

function browsePodcasts() {
    console.log('Browse podcasts clicked');
    alert('Loading podcasts...');
}

// ====== BUTTONS ======
function initializeButtons() {
    // All navigation links
    const navOptions = document.querySelectorAll('.nav-option a');
    navOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.textContent.trim();
            console.log(text + ' clicked');
        });
    });
    
    // Explore Premium button
    const explorePremiumBtn = document.querySelector('.badge.navv');
    if (explorePremiumBtn) {
        explorePremiumBtn.addEventListener('click', explorePremium);
    }
    
    // Install App button
    const installAppBtn = document.querySelector('.badge2.navv');
    if (installAppBtn) {
        installAppBtn.addEventListener('click', installApp);
    }
    
    // User profile button
    const userBtn = document.querySelector('.navv i');
    if (userBtn) {
        userBtn.style.cursor = 'pointer';
        userBtn.addEventListener('click', openUserMenu);
    }
    
    // Library link
    const libraryLink = document.querySelector('.lib-option a');
    if (libraryLink) {
        libraryLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Your Library clicked');
        });
    }
    
    // Library icons
    const libIcons = document.querySelectorAll('.lib-icon i');
    libIcons.forEach(icon => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', function() {
            console.log('Library icon clicked');
        });
    });
    
    // Cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('.c-titel').textContent;
            console.log('Opened playlist: ' + title);
            alert('Opening: ' + title);
        });
    });
    
    // Player right icons
    const playerIcons = document.querySelectorAll('.right-icon-p i');
    playerIcons.forEach((icon, index) => {
        icon.style.cursor = 'pointer';
        icon.addEventListener('click', function() {
            const icons = ['Queue', 'Microphone', 'Equalizer', 'Devices', 'Volume'];
            console.log(icons[index] + ' clicked');
        });
    });
}

function explorePremium() {
    console.log('Explore Premium clicked');
    alert('Upgrade to Spotify Premium to enjoy ad-free listening, offline downloads, and more!');
}

function installApp() {
    console.log('Install App clicked');
    alert('Opening download page...');
}

function openUserMenu() {
    console.log('User menu clicked');
    const menu = confirm('User Menu:\n- Profile\n- Settings\n- Log out\n\nVisit Spotify website for more options');
    if (menu) {
        console.log('User menu opened');
    }
}

// ====== UTILITIES ======
// Add smooth scrolling to main content
const mainContent = document.querySelector('.main-cont');
if (mainContent) {
    mainContent.addEventListener('scroll', function() {
        const stickyNav = document.querySelector('.sticky-nav');
        if (this.scrollTop > 0) {
            stickyNav.style.backgroundColor = 'rgba(18, 18, 18, 0.8)';
        } else {
            stickyNav.style.backgroundColor = '#121212';
        }
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    } else if (e.code === 'ArrowRight' && e.ctrlKey) {
        e.preventDefault();
        nextSong();
    } else if (e.code === 'ArrowLeft' && e.ctrlKey) {
        e.preventDefault();
        previousSong();
    }
});

console.log('🎵 Spotify Clone with Real Audio Playback loaded successfully!');
console.log('Press Space to play/pause, Ctrl+Right/Left to navigate songs');
