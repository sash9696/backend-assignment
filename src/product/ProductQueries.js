const pool = require('../../db')


// const getProducts = "SELECT * FROM products";
const getProducts = () => {
    return pool.query("SELECT * FROM products")
  }
const getProductsById = "SELECT * FROM products WHERE id = $1";
const isAdminAndVendor = "SELECT roles FROM users WHERE id = $1";
const createProduct =
  "INSERT INTO products(status,title,pictureUrl,price,createdby) VALUES($1,$2,$3,$4,$5)";
const changeStatusByAdmin = "UPDATE products SET status =$1 where id=$2";
const changeStatusByAdminAndVendor =
  "UPDATE products SET status ='readyForListing' where id=$1";
const updateProductByAdminAndVendor =
  "UPDATE products SET status=$1, title=$2, pictureurl=$3, price=$4 WHERE id=$5";
const deleteProductByAdmin = "DELETE FROM products WHERE id = $1";

module.exports = {
    getProducts,
    getProductsById,
    isAdminAndVendor,
    createProduct,
    changeStatusByAdmin,
    changeStatusByAdminAndVendor,
    updateProductByAdminAndVendor,
    deleteProductByAdmin,
    
  };