const express = require('express');
const path = require('path');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid')

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/apiroutes.js')(app);
require('./routes/htmlroutes.js')(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});