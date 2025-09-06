// 1. Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// 2. Initialize the Express app
const app = express();
const messagesFilePath = path.join(__dirname, 'messages.txt');

// 3. Set up middleware and view engine
app.set('view engine', 'ejs');
// This middleware is crucial for parsing form data
app.use(express.urlencoded({ extended: true }));

// 4. Define the main route to display messages
app.get('/', (req, res) => {
    // Read the messages file
    fs.readFile(messagesFilePath, 'utf8', (err, data) => {
        if (err) {
            // If the file doesn't exist, treat it as an empty messages list
            if (err.code === 'ENOENT') {
                return res.render('index', { messages: [] });
            }
            console.error(err);
            return res.status(500).send('Error reading messages file.');
        }

        // Split the file content by new lines to get an array of messages
        // Filter out any empty lines that might result from trailing newlines
        const messages = data.split('\n').filter(msg => msg.trim() !== '');

        // Reverse the array so the newest message (last in the file) is shown first
        messages.reverse();

        // Render the HTML template, passing the messages array to it
        res.render('index', { messages: messages });
    });
});

// 5. Define the route to handle new message submissions
app.post('/new-message', (req, res) => {
    // Get the new message from the form submission
    const newMessage = req.body.message;

    // Basic validation to ensure the message is not empty
    if (!newMessage || newMessage.trim() === '') {
        return res.redirect('/');
    }

    // Add a newline character to ensure each message is on a new line in the file
    const messageToSave = newMessage + '\n';

    // Append the new message to the end of the file
    fs.appendFile(messagesFilePath, messageToSave, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message.');
        }

        // Redirect the user back to the homepage to see the updated list
        res.redirect('/');
    });
});

// 6. Start the server
app.listen(3000, () => {
    console.log(`Server is running`);
});
