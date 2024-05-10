// backend/app.js
const express = require('express');
const { spawn } = require('child_process');

const app = express();

// Define an API endpoint to run Python script
app.post('/runchatbot', (req, res) => {
    // Run the Python script
    const pythonProcess = spawn('python', ['C:\\Users\\Admin\\Desktop\\Main\\react-firebase-chat\\react-firebase-chat\\backend\\Hi.py']);

    // Handle Python script output
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python output: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });

    // Send response back to client
    res.json({ message: 'Python script started.' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
