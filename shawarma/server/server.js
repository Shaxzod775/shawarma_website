const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

app.post('/api/signin', (req, res) => {
    const { phoneNumber, password } = req.body;

    const sql = `SELECT * FROM users WHERE phone = ?`;
    db.get(sql, [phoneNumber], (err, user) => {
        if (err) {
            res.status(500).json({ error: err.message });
            console.error(err.message);
            return res.status(500).json({ error: "An error occurred." });
          }
          if (!user) {
            // No user found
            return res.status(404).json({ error: "User not found." });
          }
        // Assuming passwords are stored in plain text (not recommended!)
        if (user.password === password) {
            // User authenticated successfully
            res.json({ message: 'Authentication successful', user: { phoneNumber: user.phone } });
        } else {
            // Password does not match
            res.status(401).json({ error: 'Authentication failed' });
        }
        res.json({ message: "Sign in successful", user: { phoneNumber: user.phone } });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

