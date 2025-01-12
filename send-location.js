const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    const data = JSON.parse(event.body);

    if (!data.ip || !data.latitude || !data.longitude || !data.location) {
        return {
            statusCode: 400,
            body: 'Missing required data',
        };
    }

    const content = `IP: ${data.ip}, Latitude: ${data.latitude}, Longitude: ${data.longitude}, Location: ${data.location}\n`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'afrikel173@gmail.com',  // Your email address
            pass: 'nxcn jrsx vavw byzz', // Use the app password here
        },
    });

    const mailOptions = {
        from: 'afrikel173@gmail.com',
        to: 'afrikel173@gmail.com',  // You can set this to your desired recipient
        subject: 'New Location Data Received',
        text: content,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: 'Location data saved and email sent successfully',
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: 'Error sending email',
        };
    }
};
