const express = require("express");
// const { noteRoutes, htmlRoutes } = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'))

//app.use("/", htmlRoutes);
// noteRoutes(app)
// htmlRoutes(app)
//app.use("/api/notes", noteRoutes);

require("./routes/api.routes")(app);
require("./routes/html.routes")(app);


app.listen(PORT, () => console.log(`server started on port: ${PORT}`));