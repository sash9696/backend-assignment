const { password } = require("pg/lib/defaults");
const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();


//get all users
const getUsers = async (req, res) => {
    
      const users = await queries.getUsers();
      if (users === null) {
        throw new error("No user Found");
      } else {
        res.json(users.rows);
      }
   
   
  };

//get users by id
const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
   
      const getUser = await queries.getUserById(id);
    if (getUser === null) {
      throw new error("No user Found");
    } else {
      res.json(getUser.rows);
    }
   
    
  };
// const addUser = (req, res) => {
// 	const { name, email, password, roles } = req.body;
// 	//check if email exists
// 	pool.query(queries.checkEmailExists, [email], (error, results) => {
// 		if (results?.rows?.length) {
// 			res.send("Email already exists");
// 		}
// 	});
// 	//ADD STUDENT TO DB
// 	pool.query(
// 		queries.addUser,
// 		[name, email, password, roles],
// 		(error, results) => {
// 			if (error) throw error;
// 			res.status(201).send("User Created Successfully");
// 			console.log("User Created");
// 		}
// 	);
// };
const addUser = async (req, res) => {
    const { id, name, email, password, roles } = req.body;
  
  
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    try {
    const checkEmail = await queries.checkEmailExists(email);
  
    if (checkEmail.rows.length) {
      res.send("email exists");
      return;
    } else {
      
        await queries.addUser(name, email, secPass, roles);
        const authtoken = jwt.sign(
          { name, email, password, roles },
          process.env.JWT_SECRET
        );
        res.status(200).send(authtoken);
      } 
    }
    catch (err) {
      throw err;
    }
  };
// const addUser = async (req, res) => {
//     const { id, name, email, password, roles } = req.body;
//     pool.query(queries.checkEmailExists, [email], (error, results) => {
//       if (results.rows.length) {
//         res.send("email exists");
//         return;
//       }
//       pool.query(
//         queries.addUser,
//         [name, email, secPass, roles],
//         (error, results) => {
//           const authtoken = jwt.sign(
//             { name, email, password, roles },
//             process.env.JWT_SECRET
//           );
//           if (error) throw error;
//           res.status(201).json(authtoken);
//         }
//       );
//     });
//   };
//login to the existing user table
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const getUserByEmail = await queries.getUserByEmail(email);
    if (!getUserByEmail.rows[0]) {
      return res.send("no user found");
    }
  
    var passwordCompare = await bcrypt.compare(
      password,
      getUserByEmail.rows[0].password
    );
    } catch (error) {
      throw error
    }
    
  
    try {
      if (!passwordCompare) {
        return res.status(400).json({
          error: "Please try to login with correct credentials",
        });
      } else {
        const authtoken = jwt.sign({ email, password }, process.env.JWT_SECRET);
        res.status(201).json(authtoken);
      }
    } catch (error) {
      throw error
    }
    
  };
//remove user by id
const removeUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const getUser = await queries.getUserById(id);
    console.log(id);
    console.log(getUser.rows);
  
      if (getUser.rows == 0) {
        await res.send("No user exist");
      } else {
        const isAdmin = await queries.isAdmin(id);
        if (isAdmin.rows[0].roles != "admin") {
          await res.send("cannot delete user, You're not an admin");
        } else {
        const del =  await queries.removeUserById(id);
          res.status(200).send("user deleted successfully");
        }
      }
   
  };
//update users by  id
const updateUserById =async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password, roles } = req.body;
  
 
      const getUser = await queries.getUserById(id);
      console.log("id",id);
      console.log('getUser.rows',getUser.rows);

      if (getUser.rows == 0) {
        await res.send("No user exist");
      } 
      else 
      {
        await queries.updateUserById(name, email, password, roles, id)
        res.status(200).send("user updated successfully");
      }  
  }
  
  
  
module.exports = {
	getUsers,
	getUserById,
	addUser,
    removeUserById,
    updateUserById,
    login
};
