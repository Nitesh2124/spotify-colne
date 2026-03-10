# 🎵 Spotify Web Clone

A fully functional Spotify web player clone built with HTML, CSS, and Vanilla JavaScript.

## ✨ Features

### 🎵 Music Player
- **Play/Pause**: Click the play button to toggle playback
- **Next Track**: Jump to the next song in the queue
- **Previous Track**: Go back to the previous song
- **Progress Bar**: Drag to seek to any part of the song
- **Time Display**: Current time and total duration
- **Volume Control**: Adjust volume from 0-100%
- **Now Playing**: Displays current song title and artist
- **Auto Next**: Automatically plays next song when current ends

### 👤 User Navigation
- **Home**: Navigate to the home page
- **Search**: Search functionality (extensible)
- **Your Library**: Access saved playlists and podcasts
- **User Profile**: User menu with account options
- **Back/Forward Buttons**: Browser history navigation

### 🎧 Sidebar Features
- **Create Playlist**: Create new playlists with custom names
- **Browse Podcasts**: Access podcast recommendations
- **Navigation Links**: Quick access to main sections

### 🎨 UI Features
- **Dark Theme**: Spotify's iconic dark interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Hover Effects**: Interactive hover states on all buttons
- **Smooth Transitions**: Animated transitions for better UX
- **Explore Premium**: Premium upgrade promotion
- **Install App**: Download Spotify app option

### ⌨️ Keyboard Shortcuts
- **Space**: Play/Pause current song
- **Ctrl + Right Arrow**: Next track
- **Ctrl + Left Arrow**: Previous track

## 🎛️ Interactive Elements

### Player Controls
- ▶️ **Play Button**: Start/pause current track
- ⏭️ **Next Button**: Skip to next song
- ⏮️ **Previous Button**: Go to previous song
- 🔊 **Volume Slider**: Control volume level
- 📊 **Progress Bar**: Seek through current song

### Sidebar Controls
- ❤️ **Like Button**: Mark songs as favorites  
- 🔖 **Create Playlist**: Add new playlist
- 🎙️ **Browse Podcasts**: Explore podcast content
- ➕ **Library**: Add items to your library
- ➡️ **Library Actions**: Expand library options

### Top Navigation
- ◀️ **Back**: Go to previous page
- ▶️ **Forward**: Go to next page
- 🎁 **Explore Premium**: View premium features
- 📥 **Install App**: Download desktop/mobile app
- 👤 **User Menu**: Account and settings

### Right Player Controls
- 📋 **Queue**: View song queue
- 🎤 **Microphone**: Microphone options
- 🎚️ **Equalizer**: Sound settings
- 💻 **Devices**: Switch playback devices
- 🔊 **Volume**: Volume control

## 📁 File Structure

```
spotify-clone/
├── myhtml.html      # Main HTML file
├── mycss.css        # Styling and animations
├── script.js        # JavaScript functionality
├── README.md        # Documentation
└── assets/          # Images and icons
```

## 🚀 How to Use

1. **Open the Application**: Open `myhtml.html` in your web browser
2. **Play Music**: Click the play button to start playing
3. **Navigate**: Use sidebar and top buttons to explore
4. **Create Playlist**: Click "Create Playlist" button and enter name
5. **Control Volume**: Use the volume slider on the right
6. **Seek Song**: Drag the progress bar to jump to a position

## 🎵 Song Library

The clone includes 5 sample songs:
1. Daylight - David Kushner (03:26)
2. Blinding Lights - The Weeknd (03:20)
3. As It Was - Harry Styles (02:47)
4. Heat Waves - Glass Animals (03:59)
5. Anti-Hero - Taylor Swift (03:20)

Use next/previous buttons to browse through songs.

## 🎨 Customization

### Change Spotify Green Color
Replace `#1bd760` with your desired color in `mycss.css`

### Add More Songs
Edit the `songs` array in `script.js`:
```javascript
let songs = [
    { title: 'Your Song', singer: 'Artist Name', duration: '03:26' },
    // Add more songs...
];
```

### Customize Playlists
Edit the cards in `myhtml.html` to add your own playlists

## 🌐 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## ✅ Quality Features

- ✨ Smooth animations and transitions
- 🎯 All buttons fully functional
- 📱 Mobile responsive design
- ⌨️ Keyboard shortcut support
- 🎨 Professional UI/UX
- 🔊 Volume and playback controls
- 📊 Progress bar with real-time updates
- ❤️ Favorite/Like functionality

## 📝 Notes

- This is a frontend clone for demonstration purposes
- No actual audio files are played (functionality is simulated)
- To add real music streaming, integrate with Spotify Web API

## 🔄 Future Enhancements

- [ ] Real audio playback
- [ ] Spotify API integration
- [ ] User authentication
- [ ] Playlist management
- [ ] Search functionality
- [ ] User preferences/settings
- [ ] Dark/Light theme toggle
- [ ] Offline mode support
- [ ] Lyrics display
- [ ] Social sharing

## 📄 License

This project is for educational purposes.

---

Made with ❤️ for music lovers 🎵
