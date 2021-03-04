const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/notes", routes);


app.listen(PORT, () => console.log(`server started on port: ${PORT}`));