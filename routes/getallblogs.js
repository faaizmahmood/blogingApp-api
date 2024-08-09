const express = require('express');
const router = express.Router();
const {connection} = require("../database/sql");

router.get('/', (req, res) => {
    connection.query("SELECT * FROM blogs", (err, result) => {
        if (err) {
            console.error("Database query error: ", err); // Log the error
            return res.status(500).send("Error fetching data from the database");
        } else {
            res.json(result); // Ensure the result is sent as JSON
        }
    });
});

module.exports = router;
