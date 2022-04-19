const {Router} = require('express');
const controller = require('./productController')

const router = Router();

//routes to fetch products data from table
router.get("/products", controller.getProducts);
router.get("/products/:id", controller.getProductsById);
router.post("/products", controller.createProduct);
router.put(
  "/products/readyforlisting/:id",
  controller.productToReadyForListing
);
router.put(
  "/products/activeInactive/:id",
  controller.productToActiveAndInactive
);
router.put("/products/update/:id", controller.updateProduct);
router.delete("/products/delete/:id",  controller.deleteProduct);
module.exports = router;