const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());

app.get('/api/hello', (req, res) => {
    db.query('SELECT text FROM messages LIMIT 1', (err, results) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: results[0].text });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});