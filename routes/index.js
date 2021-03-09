const router = require("express").Router();
const NoteRoutes = require("./apiroutes")

router.use("/notes", NoteRoutes);



module.exports = router;