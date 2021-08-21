const path = require('path');
const router = require('express').Router(); // getting router fxnality from express lib

/*Creating the routes to the html files  */

router.get('/', (req, res) => { // get all other routs response with index.html file
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/notes', (req, res) => { // get notes.html file
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;