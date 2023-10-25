const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'create_login.html')));
app.use(express.static(path.join(__dirname, 'login.html')));

// Middleware
app.use(bodyParser.json());

// Serve the static HTML file
app.get('create_login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'user_data.json'));
});

const user = [];

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
        
        // Find the user in the parsed data
        const user = userData.find(user => user.username === username);
        
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user.username; // Create a session
            res.status(200).json({ message: 'Login successful.' });
        } else {
            res.status(401).send('Invalid credentials.');
        }
    });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const userData = req.body;
    const userDataJson = JSON.stringify(userData, null, 2);

    fs.appendFile('user_data.json', userDataJson + '\n', (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ message: 'Failed to save user data.' });
        }

        console.log('User data saved successfully:', userData);
        res.status(200).json({ message: 'User data submitted successfully.' });
    });
});

app.listen(port, () => {
    const serverAddress = `http://localhost:${port}`;
    console.log(`Server is running on ${serverAddress}`);
});
