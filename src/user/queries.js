const getUsers  = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const checkEmailExists = "SELECT s FROM users s WHERE email = $1";
const addUser = "INSERT INTO users (name, email, password, roles) VALUES ($1, $2, $3, $4)";
const isAdmin = "SELECT roles FROM users WHERE id = $1";
const removeUserById = "DELETE FROM users WHERE id = $1";
const updateUserById =
  "UPDATE users SET name = $1 ,email =$2,password=$3,roles=$4 WHERE id=$5";
module.exports = {
    getUsers,
    getUserById,
    checkEmailExists,
    addUser,
    isAdmin,
    removeUserById,
    updateUserById
}