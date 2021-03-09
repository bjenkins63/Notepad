const router = require("express").Router();
const NoteRoutes = require("./apiRoutes")

router.use("/notes", NoteRoutes);



module.exports = router;