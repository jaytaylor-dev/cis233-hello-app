const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());

app.get('/api/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});

app.get('/api/ping', (req, res) => {
        res.json({ message: "pong" });
});

app.get('/api/check-db', (req, res) => {
        res.json({ test: "working" });
});

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
app.listen(PORT, '0.0.0.0', () => {
    console.log(`We got a connection through -> ${PORT}`);
});