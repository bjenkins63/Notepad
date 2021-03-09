const util = require('util');
const fs = require('fs');

const uuidv4 = require('uuidv4');

const readFileAsync = util.promisify(fs.readfile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', JSON.stringify(note));
    
    }
    
getNotes() {
    return this.read().then((notes) => {
    let parsedNotes;
    
    try {
        parsedNotes = [].concat(JSON.parse(notes));
    }catch (err) {
        parsedNotes = [];
    }

    return parsedNotes;
    });
}

addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
        throw new Error("Can not be left blank!")
    }
    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
    .then((notes) => [...notes, newNote])
    .then((updateNotes) => this.write(updatedNotes))
    .then(() => newNote);
}

removeNote(id) {
    return this.getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes));

    }
}

module.exports = new Store();
