const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const port = process.env.port || 8080;

const apioutes = require('./routes/apiroutes')(app);
const htmlroutes = require('./routes/htmlroutes')(app);


app.use(express.static('public'));


app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
});