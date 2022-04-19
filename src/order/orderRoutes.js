const {Router} = require('express');
const controller = require('./orderController')

const router = Router();
router.get("/orders", controller.getOrders);
// router.post("/createorder/:id",controller.createorder);

module.exports = router;

