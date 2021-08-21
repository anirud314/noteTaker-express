const router = require('express').Router();
const dbClass = require('../db/dbClass');




router.get('/notes', (req, res)=>{ // get all notes from the database
    /*readFileAsync('../db/db.json', 'utf8').then((notes) => {
        let inputNotes;

        try {
            inputNotes = [].concat(JSON.parese(notes));
        }
        catch (err) {
            inputNotes = [];
        }
    })*/
    dbClass
        .getNotes()
        .then((notes) => {return res.json(notes)})
        .catch((err) => res.status(500).json(err));
   

});

router.post('/notes', (req, res) => { // post a note into the database
    /*const {title, text} = req.body;
    if(!title || !text) {
        throw new Error("Title and Text cannot be blank");
    }

    const newNote = {title, text, id: uuidV1()};

    read()
    .then((notes)=> [...notes, newNote])
    .then((addNoteUpdate) => writeFileAsync('../db/db.json', JSON.stringify(addNoteUpdate)))
    .then(() => newNote);*/
    dbClass
        .postNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));


});

module.exports = router;