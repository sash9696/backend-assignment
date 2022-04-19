const {Router} = require('express');
const controller = require('./controller')

const router = Router();

router.get("/users",controller.getUsers)
router.post("/users", controller.addUser)
router.get("/users/:id", controller.getUserById)
router.delete("/users/:id", controller.removeUserById);
router.put("/users/:id", controller.updateUserById);
module.exports = router;