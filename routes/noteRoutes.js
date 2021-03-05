const fs = require("fs");

const editNote = (updatedNotesArray) => {
  fs.writeFile("./db/db.json", JSON.stringify(updatedNotesArray), (err) => {
    if (err) throw err;
  });
};

module.exports = (app) => {

  app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  // POST REQUEST
  app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      const notesArr = JSON.parse(data);
      newNote.id = generateUniqueId({ length: 10 });
      notesArr.push(newNote);

      editNote(notesArr);
      console.log(
        `New Note Added! Title: ${JSON.stringify(
          newNote.title
        )}, Text: ${JSON.stringify(newNote.text)}, ID: ${newNote.id}`
      );

      res.send(notesArr);
    });
  });

  // DELETE REQUEST
  app.delete("/api/notes/:id", (req, res) => {
    const deleteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;
      let notesArr = JSON.parse(data);
      for (let i = 0; i < notesArr.length; i++) {
        if (notesArr[i].id === deleteId) {
          notesArr.splice(i, 1);
        }
      }
      editNote(notesArr);
      console.log(`Note Deleted! Note ID: ${deleteId}`);
      res.send(notesArr);
    });
  });

  // PUT REQUEST
  app.put("/api/public/notes/:id", (req, res) => {
    const editId = req.params.id;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      let notesArr = JSON.parse(data);

      let selectedNote = notesArr.find((note) => note.id === noteId);

      if (selectedNote) {
        let updatedNote = {
          title: req.body.title,
          text: req.body.text, 
          id: selectedNote.id,
        };


        let targetIndex = notesArr.indexOf(selectedNote);

        //  replace object data with `updatedNote` object
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