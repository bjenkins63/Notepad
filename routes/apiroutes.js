
const router = require('express').Router();
const fs = require('fs');
const activeNote = require('./data/notesData.json');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = router => {


router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname,'./db/db.json'), 'utf-8', (err, data) => {
        let newnotes = JSON.parse(data);
        res.json(activeNote);
    });
});

router.post('/api/notes', (req, res) => {
    let id = uuid.v4();
    let newNote = {
        id: id, 
        title: req.body.title,
        text: req.body.text,
    };
    fs.readFile('./data/notesData.json', (err, data) => {
        if (err) throw err;
        const activeNote = JSON.parse(data);
        note.push(note);
        fs.writeFile(path.join(__dirname,'./db/db.json'), JSON.stringify(activeNote), err => {
            if (err) throw err;
            res.send(activeNote)
        });
    });
});

router.delete('/api/notes/:id', (req, res) => {
    let thisnote = req.params.id;
    fs.readFile(path.join(__dirname,'./data/notesData.json'), 'utf-8', (err, data) => {
        let activeNote = JSON.parse(data);
        const filteredNotes = activeNote.filter(note => note.id != thisnote)
        activeNote.splice(filteredNotes);
        fs.writeFile(path.join(__dirname, './db/db.json.json'), JSON.stringify(FilteredNotes), 'utf-8', (err, data) => {
            if (err) throw err;
            res.send(activeNote);
        })
    })
    
    })
};