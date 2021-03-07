const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const editNote = (updatedNotesArray) => {
    fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
        if (err) throw err;
    });
};

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json'), 'utf-8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
        };
    });

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    let id = uuidv4();
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const notesArr = JSON.parse(data);
        notesArr.push(newNote);

        editNote(notesArr);
        console.log('New note added!'
        );
        res.send(notesArr);
        });
    });

app.delete('/api/notes/:id', (req, res) => {
    const deletId = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let notesArr = JSON.parse(data);
        for (let i = 0; i < notesArr.length; i++) {
            if (notesArr[i].id === deleteId) {
                notesArr.splice(i, 1);
            }
        }
        editNote(notesArr);
        console.log('note deleted')
            res.send(activeNote);
        });
    });

app.put("/api/notes/:id", (req, res) => {
    const editId = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let notesArr = JSON.parse(data);
        let selectedNote = notesArr.find((note) => note.id === editID);
        if (selectedNote) {
            let updatedNote = {
                title: req.body.title,
                text: req.body.text,
                id: selectedNote.id,
            };
            let targetIndex = notesArr.indexOf(selectedNote);
            notesArr.splice(targetIndex, 1, updatedNote);
            res.sendStatus(204);
            editNote(notesArr);
            res.json(notesArr);
        } else {
            res.sendStatus(404);
        }   
    });
});
};

