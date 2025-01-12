const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');  // Import cors
const app = express();
const port = 3000;

// Enable CORS for your Netlify domain (replace with your actual Netlify domain)
app.use(cors({
    origin: 'https://your-netlify-site-name.netlify.app',  // Replace with your Netlify domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // Middleware to parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (HTML, CSS, JS)

// Handle IP location data and save it to a file
app.post('/save-location', (req, res) => {
    const data = req.body; // The body contains the location data

    if (!data.ip || !data.latitude || !data.longitude || !data.location) {
        return res.status(400).send('Missing required data');
    }

    const content = `IP: ${data.ip}, Latitude: ${data.latitude}, Longitude: ${data.longitude}, Location: ${data.location}\n`;

    fs.appendFile('location.txt', content, (err) => {
        if (err) {
            return res.status(500).send('Error saving data');
        }
        res.send('Location data saved');
    });
});

// Handle GET requests to root and serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
