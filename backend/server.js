const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());


// this is the place that all of our API calls occur. 

// simple get request to test if database is functioning.
app.get('/api/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
});


// simple ping to ensure that database objects are retrievable
app.get('/api/ping', (req, res) => {
        res.json({ message: "pong" });
});

// original database check can be used interchangebly with ping
app.get('/api/check-db', (req, res) => {
        res.json({ test: "working" });
});


/*
This is the original query used to call to the sql database 
retrieve the hello message that we created in the hello_app() DB.

app.get('/api/hello', (req, res) => {
    db.query('SELECT text FROM messages LIMIT 1', (err, results) => {
        if(err) {
            res.status(500).send(err);
            return;
        }
        res.json({ message: results[0].text });
    });
});
*/

app.use(express.json());

// this pushes the message (title body) to the database  into the notes table
app.post('/api/notes', (req, res) => {
    const { title, body } = req.body;

    db.query(
        'INSERT INTO notes (title, body) VALUES (?, ?)',
        [title, body],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId });
        }
    );
});

// this request all the messages saved to the notes table in the database
app.get('/api/notes', (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// this request updates an existing note in the table via id
app.put('api/notes/:id', (req, res) => {
    const {title, body} = req.body;
    const { id } = req.params;

    db.query('UPDATE notes SET title=?, body=? WHERE id=?',
        [title, body, id],
        (err) => {
            if(err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

app.delete('api/notes/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM notes WHERE id=?', [id], (err) => {
        if(err) return res.status(500).json(err);
        res.json({ success: true });
    });
});
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`We got a connection through -> ${PORT}`);
});