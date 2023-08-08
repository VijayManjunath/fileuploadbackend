const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Upload files to the 'uploads' directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.get('/hello', (req, res) => {
  res.send('Hello, World!');
});

// Serve static files
app.use(express.static('public'));

// API endpoint to handle file uploads
app.post('/upload', upload.array('uploads', 10), (req, res) => {
    try {
        // Handle uploaded files here (e.g., save to database, process, etc.)
        console.log('Uploaded files:', req.files);

        // Send a success response
        res.status(200).json({ message: 'Files uploaded successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the files' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
