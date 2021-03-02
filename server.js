const express = require('express');
const app = express ();

app.use(express.static(path.join(__dirname, 'public')));

// MIDDLEWARE
// Sets up the Express app to handle data parsing for POST and PUT requests, because in both these requests you are sending data to the server and you are asking the server to accept or store that data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the Express app to serve static files
app.use(express.static("public"));

// ROUTER
// The below points our server to a series of "route" files.
require("./routes/api.routes")(app);
require("./routes/html.routes")(app);
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.




const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));
