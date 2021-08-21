const util = require('util');
const fs = require('fs');

const uuidV1 = require('uuid/v1');
/*const uuid = require('uuid');
const uuidV1 = uuid.v1();*/
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class dbClass {
    read(){
        return readFileAsync('db/db.json', 'utf8')
    }
    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    getNotes(){
        return this.read().then((notes) => {
             let inputNotes;
     
             try {
                 inputNotes = [].concat(JSON.parse(notes));
             }
             catch (err) {
                 inputNotes = [];
             }
             return inputNotes;
         });
     };

     postNote(note){
        const {title, text} = note;
        if(!title || !text) {
            throw new Error("Title and Text cannot be blank");
        }
    
        const newNote = {title, text, id: uuidV1()};
    
        return this.getNotes()
        .then((notes)=> [...notes, newNote])
        .then((addNoteUpdate) => this.write(addNoteUpdate))
        .then(() => newNote);
    }

}

module.exports = new dbClass;