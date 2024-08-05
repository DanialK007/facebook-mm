const express = require("express");

const router = express.Router();

router.get("/product", (req, res) => {
    res.send("Welcome to product")
})

module.exports = router;