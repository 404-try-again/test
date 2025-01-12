const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { ip, latitude, longitude, location } = req.body;

        // Set up nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'afrikel173@gmail.com',  // Replace with your Gmail address
                pass: 'nxcn jrsx vavw byzz'      // Replace with your app password
            }
        });

        // Prepare the email content
        const mailOptions = {
            from: 'afrikel173@gmail.com',
            to: 'afrikel173@gmail.com',  // Replace with the email you want to receive the data
            subject: 'Location Data',
            text: `IP: ${ip}\nLatitude: ${latitude}\nLongitude: ${longitude}\nLocation: ${location}`
        };

        // Send the email
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Location sent successfully!' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
