const Pool = require('pg').Pool;
const pool = new Pool({
    user: "sahil",
    host: "localhost",
    database: "users",
    password: "test",
    port: 5432,
})
module.exports = pool