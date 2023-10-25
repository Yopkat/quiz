const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing
const session = require('express-session'); // For session management

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true })); // Initialize session
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.json());

// Serve the static HTML files
app.get('/create_login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'create_login.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// User data (for simplicity, this should be stored in a database)
const users = [];

const userData = [];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Load user data from user_data.json (you need to read and parse the file)
    const userDataFilePath = path.join(__dirname, 'userr_data.json');
    fs.readFile(userDataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading userr_data.json:', err);
            res.status(500).send('Internal server error.');
            return;
        }
        
        // Parse the JSON data
        const userData = JSON.parse(data);
        
       
app.get('/web.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'web.html'));
});


app.post('/submit', (req, res) => {
    const { 'First-name': firstName, 'Last-name': lastName, 'Phone-number': phoneNumber, 'Your-Email': email, username, password } = req.body;
    const userData = { firstName, lastName, phoneNumber, email, username, password };
    const userDataJson = JSON.stringify(userData, null, 2);
    const userFilePath = path.join(__dirname, 'userr_data.json'); // Full path to user_data.json

    fs.appendFile(userFilePath, userDataJson + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ message: 'Failed to save user data.' });
        }

        console.log('User data saved successfully:', userData);
        res.status(200).json({ message: 'User data submitted successfully.' });
    });
});

// ... (other routes and app.listen)


app.get('/protected', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ message: 'Authorized access to protected route.' });
    } else {
        res.status(401).json({ message: 'Unauthorized access.' });
    }
});

app.listen(port, () => {
    const serverAddress = `http://localhost:${port}`;
    console.log(`Server is running on ${serverAddress}`);
    console.log(`Login: ${serverAddress}/login.html`);
});
