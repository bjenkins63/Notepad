//declare installed frameworks
const express = require('express');
const bodyParser = require('body-parser');

let note = [{ id: 1, body: 'We have a text' }, { id: 2, body: 'This is a second text' }]

//call express and body-parser
let app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

//serving static files
app.use(express.static('public'));

//installed ejs and created file inside views
app.set('view engine', 'ejs');

//set up route
app.get('/', function (req, res){
    res.render('notes', {
        note: note
    });
});

//post 
app.post("/addNotes", function (req, res) {
    //asign id
    const userNote = {};
    userNote.id = Math.random() * 100
    userNote.body = req.body.newNote
    note.push(userNote);
    //redirect to root
    res.redirect('/');

});

//delete

app.post('/deleteNote/:id', function (req, res) {
    console.log(req.params.id);
    const deleteNotes = note.filter(item => item.id != req.params.id);
    note = deleteNotes;
    return res.redirect('/');
});



//set server port
app.listen(5000, function () {
    console.log("NoteApp server is running at port 5000...")
  });