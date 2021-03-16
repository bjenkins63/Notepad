// Dependencies
// =============================================================
// Express router functions
const router = require("express").Router();
// Allows the generation of unique ids
const { v4: uuidv4 } = require('uuid');
// Get access to the database file
const dbData = require('../db/db');

// API routes
// =============================================================
// Get the JSON file
router.get("/notes", (req, res) => {
    try {
        res.json(dbData);
        // res.json(Notes.readNotes());
    } catch (err) {
        res.status(500).end();
    }
});
// Edit the JSON file with the new note
router.post("/notes", async (req, res) => {
    // Create the new note
    let newNote = 
    {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    }
    try {
        dbData.push(newNote);
        res.json(dbData);
    } catch (err) {
        res.status(500).end();
    }
});
// Delete the note with the specified UUID
router.delete("/notes/:id", (req, res) => {
    // Find the index value of the object with matching ids
    let noteIndex = dbData.findIndex( element => {
        return element.id == req.params.id
    });
    try {
        dbData.splice(noteIndex,1);
        res.json(dbData);
    } catch (err) {
        res.status(500).end();
    }
});

// Exports
// =============================================================
module.exports = router;