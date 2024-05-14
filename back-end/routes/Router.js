const express = require("express");
const router = express();

//test route

router.get("/", (req, res) => {
  res.send("API Working!");
});

router.use("/api/users", require("./UserRoutes"));
router.use("/api/notes",require("./NotesRoutes"));

module.exports = router;
