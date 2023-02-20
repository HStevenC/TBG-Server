const pool = require("../db");

exports.start = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};