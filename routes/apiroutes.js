let db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

module.exports = (app) => {

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        return res.json(JSON.parse(data))
    })
});

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    newNote.id = uuidv4();
    db.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
        res.json(db)
    })
 });

 app.delete('/api/notes/:id', (req, res) => {
    let idToBeDeleted = req.params.id
    
    for(i=0;i<db.length;i++){
        if(idToBeDeleted == db[i].id){
            db.splice(i, 1)
        }
    }

    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
 
        res.json(db)
    })
});

};
