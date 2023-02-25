const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const port = process.env.PORT || 5000;

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

// app.get('/', (req, res) => {
//   res.send("Hello from the inside!");
// })

app.listen(port, () => console.log(`Server has started on port ${port}!`));
