const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send("Hello from the inside!");
})

app.listen(port, () => console.log(`Server has started on port ${port}!`));
