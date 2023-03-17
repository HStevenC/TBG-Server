const pool = require("../db");

exports.start = async (req, res) => {
    try {
        console.log(req.user.id);   
        const user = await pool.query(
            "SELECT user_name FROM users WHERE user_id = $1",
            [req.user.id]
        );
         
        res.json(user.rows[0].user_name);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
};