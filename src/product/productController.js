const pool = require("../../db");
const queries = require("./ProductQueries");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config();

const getProducts = async (req, res) => {
    const token = req.header("auth-token");
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const role = data.roles;
    console.log("role in getproduct " + role);
  
    try {
      const getPdt = await queries.getProducts();
      if (!getPdt) {
        res.send("Product does not exist");
      } else {
        res.status(200).send(getPdt.rows);
      }
    } catch (error) {
      throw error;
    }
  };
const getProductsById = (req, res) => {
    
    const id = req.params.id;
    pool.query(queries.getProductsById, [id], (error, result) => {
      if (error) throw error;
      if (!result.rows.length) {
        res.send("product does not exist");
      } else {
        res.status(200).send(result.rows);
      }
    });
  };
  const createProduct = (req, res) => {
    const { status, title, pictureUrl, price, createdby } = req.body;
    pool.query(queries.createProduct,[status, title, pictureUrl, price, createdby], (error, result) => {
		if(error) throw error;
        res.status(200).send("Added products successfully");
	});
  }
  const productToReadyForListing = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getProductsById, [id], (error, result) => {
        if (error) throw error;
        if (!result.rows.length) {
          res.send("product does not exist");
        } else {
         
            pool.query(
              queries.changeStatusByAdminAndVendor,
              [id],
              (error, result) => {
                if (error) throw error;
    
                res.status(200).send("Product is ready for listing");
              }
            );
         
        }
      });
  }
  const productToActiveAndInactive = (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    pool.query(queries.getProductsById, [id], (error, result) => {
        if (error) throw error;
        if (!result.rows.length) {
            res.send("product does not exist");
          } else {
              pool.query(queries.changeStatusByAdmin, [status, id], (error , result) => {
                if (error) throw error;

                res
                  .status(200)
                  .send(`Successfully changed product status to ${status}`);
              })
          }
    })
  }
  const updateProduct = (req, res) => {
    const id = req.params.id;
    const { status, title, pictureUrl, price } = req.body;

    pool.query(queries.getProductsById, [id], (error, result) => {
        if(error) throw error;
        if(!result.rows.length){
            res.send('No Product Found')
        }else{
            pool.query(queries.updateProductByAdminAndVendor, [status, title, pictureUrl, price, id], (error, result)=>{
                if (error) throw error;
                res.status(200).send("Successfully updated the product");
            })
        }

    })
  }
  //delete products by their id
const deleteProduct = (req, res) => {
    const id = req.params.id;
   
  
    pool.query(queries.getProductsById, [id], (error, result) => {
      if (error) throw error;
      if (!result.rows.length) {
        res.send("product does not exist");
      } else {
       
          pool.query(queries.deleteProductByAdmin, [id], (error, result) => {
            if (error) throw error;
  
            res.status(200).send("Successfully deleted product");
          });
       
      }
    });
  };
module.exports = {
    getProducts,
    getProductsById,
    createProduct,
    productToReadyForListing,
    productToActiveAndInactive,
    updateProduct,
    deleteProduct
}