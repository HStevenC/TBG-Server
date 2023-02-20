const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "13243561",
    host: "localhost",
    port: "5432",
    database: "textGame"
});

module.exports = pool;