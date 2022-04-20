const {Router} = require('express');
const controller = require('./orderController')

const router = Router();
router.get("/orders", controller.getOrders);
router.get("/orders/:id", controller.getOrdersById);
// router.post("/createorder/:id",controller.createorder);
router.put("/orders/:id", controller.updateOrdersById);

module.exports = router;

