const notes = require("../db/db");

class Note {

    // baseUrl = "https://jsonplaceholder.typicode.com/todos";
    // update

    update({ id, ...payload }) {
        let index;
        let update = notes.find((note, i) => {
            index = i;
            note.id === id
        });
        update = {
            id: id,
            ...payload
        };
        notes[index] = update;
        return notes;
    }

    // create

    create(payload) {
        notes.push(payload);
        return notes;
    }

    // delete

    remove(id) {
        let index;
        const notes = notes.find((n, i) => {
            index = i;
            n.id === id
        });
        notes.splice(index, 1);
    }

    // read

    read(id) {
        return notes.find((n) => n.id === id);
    }

    list() {
        return notes;
    }

}

module.exports = new Note();