
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Setting up the public directory
app.use(express.static('public'));

// Configure Multer (File Upload Middleware)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', upload.single('pdfFile'), (req, res) => {
    // Handling file upload
    if (req.file) {
        res.send('File uploaded successfully.');
    } else {
        res.send('Error uploading file.');
    }
});

app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'resume.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


