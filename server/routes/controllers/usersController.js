const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
   console.log('here');
   res.status(401);
   res.send("Great");
});

module.exports = router;