const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const apiroutes = require('./routes/apiroutes');
const htmlroutes = require('./routes/htmlroutes');

app.use(express.static('public'));

app.use("/api", apiroutes);
app.use("/", htmlroutes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.port || 8080;


app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
});