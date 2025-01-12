const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'afrikel173@gmail.com', // Your email
        pass: 'nxcn jrsx vavw byzz' // Replace with your app password
    }
});

// API to handle location data
app.post('/save-location', (req, res) => {
    const data = req.body;

    if (!data.ip || !data.latitude || !data.longitude || !data.location) {
        return res.status(400).send('Missing required data');
    }

    const content = `IP: ${data.ip}, Latitude: ${data.latitude}, Longitude: ${data.longitude}, Location: ${data.location}\n`;

    // Save to location.txt
    fs.appendFile('location.txt', content, (err) => {
        if (err) {
            console.error('Error saving data to file:', err);
            return res.status(500).send('Error saving data');
        }

        // Send email with the location data
        const mailOptions = {
            from: 'afrikel173@gmail.com',
            to: 'afrikel173@gmail.com', // You can change the recipient email
            subject: 'New Location Data Received',
            text: `Here is the new location data:\n\n${content}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send('Error sending email');
            }
            console.log('Email sent successfully:', info.response);
            res.send('Location data saved and email sent successfully');
        });
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
