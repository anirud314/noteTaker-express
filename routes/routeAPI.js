const router = require('express').Router();
const util = require('util');
const fs = require('fs');

const uuidV1 = require('uuid/v1');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function read(){
   return( readFileAsync('../db/db.json', 'utf8').then((notes) => {
        let inputNotes;

        try {
            inputNotes = [].concat(JSON.parese(notes));
        }
        catch (err) {
            inputNotes = [];
        }
    }));
}


router.get('/notes', (req, res)=>{ // get all notes from the database
    //some logic
    /*readFileAsync('../db/db.json', 'utf8').then((notes) => {
        let inputNotes;

        try {
            inputNotes = [].concat(JSON.parese(notes));
        }
        catch (err) {
            inputNotes = [];
        }
    })*/
    read()
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));

});

router.post('/notes', (req, res) => { // post a note into the database
    //some logic
    const {title, text} = req.body;
    if(!title || !text) {
        throw new Error("Title and Text cannot be blank");
    }

    const newNote = {title, text, id: uuidV1()};

    read()
    .then((notes)=> [...notes, newNote])
    .then((addNoteUpdate) => this.writeFileAsync('db/db.json', JSON.stringify(addNoteUpdate)));
    

});

module.exports = router;