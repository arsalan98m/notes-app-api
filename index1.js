const express = require('express'); // importing express
const app = express(); // create and express application
const port = 3000; // define a port

app.get('/', (req, res) => {
  const peoples = [
    { name: 'arsalan', designation: 'front end developer' },
    { name: 'shahrukh', designation: 'angular developer' },
  ];

  const fruits = ['apple', 'banana', 'mango'];
  res.json(peoples); //JSON = Javascript object notation
  console.log('testing');
});

app.get('/learners', (req, res) => {
  res.send('Hello Learners!');
});

app.listen(port, () => {
  // run the app on the port
  console.log(`Example app listening at http://localhost:${port}`);
});

// front end request karta hain backend response deta hai
