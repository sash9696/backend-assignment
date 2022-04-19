const { password } = require("pg/lib/defaults");
const pool = require("../../db");
const queries = require("./queries");

//get all users
const getUsers = (req, res) => {
	pool.query(queries.getUsers, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

//get users by id
const getUserById = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query(queries.getUserById, [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};
const addUser = (req, res) => {
	const { name, email, password, roles } = req.body;
	//check if email exists
	pool.query(queries.checkEmailExists, [email], (error, results) => {
		if (results?.rows?.length) {
			res.send("Email already exists");
		}
	});
	//ADD STUDENT TO DB
	pool.query(
		queries.addUser,
		[name, email, password, roles],
		(error, results) => {
			if (error) throw error;
			res.status(201).send("User Created Successfully");
			console.log("User Created");
		}
	);
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

//remove user by id
const removeUserById = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query(queries.getUserById, [id], (error, result) => {
		if (!result.rows.length) {
			res.send("no user found");
			return;
		} else {
			pool.query(queries.isAdmin, [id], (error, result) => {
				if (result.rows[0].roles !== "admin") {
					res.send("Only admin can delete a user");
					return;
				}else{
                    pool.query(queries.removeUserById, [id], (error, results) => {
                        if (error) throw error;
                        res.status(200).send("user deleted successfully");
                      });
                }
			});
		}
	});
};
//update users by  id
const updateUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, password, roles } = req.body;
    pool.query(queries.getUserById, [id], (error, results) => {
      const noUserFound = !results.rows.length;
      if (noUserFound) {
        res.send("No user exists");
        return;
      }
  
      pool.query(
        queries.updateUserById,
        [name, email, password, roles, id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("user updated successfully");
        }
      );
    });
  };
module.exports = {
	getUsers,
	getUserById,
	addUser,
    removeUserById,
    updateUserById
};
