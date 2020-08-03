const express = require('express');
const fs = require('fs');
const path = require('path');

const {notes} = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

function createNewNote(body, notesArray) {
    const note = body; 
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return note; 
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    let results = notes; 
    res.json(results);
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});