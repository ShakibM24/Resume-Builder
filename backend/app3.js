document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    fetch('/generate-resume', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => {
        // Display the generated resume
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
});
