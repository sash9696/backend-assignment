const pool = require("../../db");
const queries = require("./orderQueries");

const getOrders = async (req, res) => {
  
    const getOrder = await queries.getOrders();
    if (!getOrder) {
      res.send("No order exists");
    } else {
      res.status(200).send(getOrder.rows);
    }
  };
  const getOrdersById =  (req, res) => {
    
    const id = req.params.id;

    if (!queries.getOrdersById(id)) {
      res.send("order does not exist");
    } else {
      res.status(200).send(queries.getOrdersById.rows);
    }
  };
  const updateOrdersById = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
   

      const getPdtById = await queries.getOrdersById(id);
  
      if (!getPdtById) {
        res.send("product does not exist");
      }else {
          const updateOrder = await queries.updateOrdersById(status, id);
          res.status(200).send("Updated order successfully");
      }
   
  };
//   const createorder = async (req, res) => {
//     const id = req.params.id;
//     const { bodyId } = req.body;
//     const getId = await queries.getProductsById(bodyId);
//     const createorder = await queries.createOrder(
       
//       );
  
//     }
  
  
  module.exports = {
      getOrders,
      getOrdersById,
      updateOrdersById,
    //   createorder
  }