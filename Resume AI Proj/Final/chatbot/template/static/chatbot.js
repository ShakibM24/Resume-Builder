function sendMessage() {
    var userInput = document.getElementById('userInput').value;
    document.getElementById('userInput').value = ''; // Clear the input after sending

    fetch('http://localhost:5000/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            // More detailed error handling
            response.json().then(json => {
                console.error('Error from server:', json.error);
                throw new Error('Failed to fetch: ' + response.statusText + ' Server said: ' + json.error);
            }).catch(err => {
                // This catches any error in the json parsing phase
                throw new Error('Failed to parse JSON: ' + err);
            });
        }
    })
    .then(data => {
        if (data && data.response) {
            displayMessage(data.response, 'bot');
        }
    })
    .catch(error => {
        console.error('Failed to send message:', error);
    });
}
