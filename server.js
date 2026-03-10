const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Function to find an available port
function findAvailablePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = require('net').createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', () => {
            // Port is in use, try next one
            findAvailablePort(startPort + 1).then(resolve).catch(reject);
        });
    });
}

// Start the server on an available port
findAvailablePort(3000).then(port => {
    app.listen(port, () => {
        console.log(`🎵 Spotify Clone server running at http://localhost:${port}`);
        console.log(`📁 Serving files from: ${__dirname}`);
        console.log(`🌐 Open your browser and go to: http://localhost:${port}/myhtml.html`);
    });
}).catch(err => {
    console.error('❌ Could not find an available port:', err);
});