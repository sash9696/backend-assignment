const pool = require("../../db");
const queries = require("./orderQueries");

const getOrders = (req, res) => {
  
  
    if (!queries.getOrders) {
      res.send("No order exists");
    } else {
      res.status(200).send(queries.getOrders.rows);
    }
  };

  module.exports = {
      getOrders
  }