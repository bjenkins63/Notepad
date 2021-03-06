let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

if (window.location.pathname === '/notes') {
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  noteList = document.querySelectorAll('.list-container .list-group');
}

const show = (elem) => {
  elem.style.display = 'inline';
};

const hide = (elem) => {
  elem.style.display = 'none';
};

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = () =>
  fetch('/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveNote = (note) =>
  fetch('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

const deleteNote = (id) =>
  fetch(`/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const editNote = (id) =>
fetch(`/notes/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
});

const renderActiveNote = () => {
  // hide(saveNoteBtn);

  if (activeNote.id) {
    // noteTitle.setAttribute('readonly', true);
    // noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.body;
  } else {
    noteTitle.value = '';
    noteText.value = '';
  }
};

//getAndRenderNotes();

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    body: noteText.value,
  };

  console.log(
    `New Note Added! Title: ${JSON.stringify(
      newNote.title)}, 
     Body: ${JSON.stringify(newNote.body)}`
  );

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteEdit = (event) => {
  event.stopPropagation();
  handleNoteView();

var note = event.target;
var noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {
      title: noteTitle.value.trim(),
      text: noteText.value.trim(),
    };
  };

  editNote(noteId).then(() => {
    saveNote(activeNote);
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteDelete = (event) => {
  event.stopPropagation();

  const note = event.target;
  const noteId = JSON.parse(note.parentElement.getAttribute("data-note")).id;
  console.log(`Note Deleted! Note ID: ${noteId}`);

  if (activeNote.id === noteId) {
    activeNote = {};
  };

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

const handleNoteView = (event) => {
  activeNote = JSON.parse(event.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }d
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  let jsonNotes = await notes.json();

  if (window.location.pathname === './notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

  // Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');

      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

  if (window.location.pathname === './notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();