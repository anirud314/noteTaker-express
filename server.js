const express = require('express');
const html = require('./routes/htmlRoutes');
const api = require('./routes/apiRoutes');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', api);
app.use('/', html);

app.listen(port, () => console.log(`Listening on port: ${port}`));