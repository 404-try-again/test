// script.js

const button = document.getElementById('sendLocationBtn');

button.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Send the location data to your backend server
            fetch('/save-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude }),
            })
            .then(response => response.text())
            .then((data) => {
                alert('Location sent successfully!');
            })
            .catch((error) => {
                alert('Failed to send location');
            });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
