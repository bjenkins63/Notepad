const express = require("express");
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8080;

const router= require('./routes/Router');
router(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

require("./routes/api.routes")(app);
require("./routes/html.routes")(app);

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));