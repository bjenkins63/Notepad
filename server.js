const express = require('express');
// const path = require('path');
const fs = require('fs');
const apiroutes = require('./routes/apiroutes');
const htmlroutes = require('./routes/htmlroutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use("/api", apiroutes);
app.use("/", htmlroutes);

app.listen(port, () => {
    console.log(`App listening on PORT: ${PORT}`);
});