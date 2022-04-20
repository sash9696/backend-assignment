const {Router} = require('express');
const controller = require('./productController')
var fetchuser = require("../middelware/fetchUser");
const router = Router();

//routes to fetch products data from table
router.get("/products",fetchuser, controller.getProducts);
router.get("/products/:id",fetchuser, controller.getProductsById);
router.post("/products",fetchuser, controller.createProduct);
router.put(
  "/products/readyforlisting/:id", fetchuser,
  controller.productToReadyForListing
);
router.put(
  "/products/activeInactive/:id",fetchuser,
  controller.productToActiveAndInactive
);
router.put("/products/update/:id",fetchuser, controller.updateProduct);
router.delete("/products/delete/:id",fetchuser,  controller.deleteProduct);
module.exports = router;