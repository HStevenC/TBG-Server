const pool = require("../db");
const bcrypt = require('bcrypt');
const jwtGen = require("../utils/jwtGen");


//post: register
exports.register = async(req, res) =>{
    try {
        const {user_name, user_email, user_password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            user_email,
        ]);

        if(user.rows.length !== 0){
            return res.status(401).send("User already exist.");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(user_password, salt);
        const newUser = await pool.query('INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',[user_name, user_email, bcryptPassword]);

        const token = jwtGen(newUser.rows[0].user_id);
        res.json({token});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

//post: login
exports.login = async(req, res) =>{
    try {
        const {user_email, user_password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            user_email,
        ]);

        if(user.rows.length === 0){
            return res.status(401).json("Password or Email is incorrect");
        }
        
        const validPassword = await bcrypt.compare(user_password, user.rows[0].user_password);
        if (!validPassword){
            return res.status(401).json("Password or Email is incorrect")
        }
        
        const token = jwtGen(user.rows[0].user_id);
        res.json({token});
       
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

//verify token
exports.isVerify = async(req, res) => {
    try {
        res.json(true);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}