const express = require('express'); // importing express
const app = express(); // create and express application
const port = 5000; // define a port
const cors = require('cors');
const { notesRouter } = require('./api/v1');
const config = require('dotenv').config();

require('./db');

app.use(cors());
app.use(express.json());

// root
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/notes', notesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
