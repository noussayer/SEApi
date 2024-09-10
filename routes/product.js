const express = require("express");
const productRouter = express.Router();
const auth = require("../middelwares/auth");
const Product = require('../models/product');

productRouter.get('/api/products', auth, async (req, res) => {
    try {
        const products = await Product.find({category: req.query.category});
        res.json(products);

    } catch(e) {
        res.status(500).json({error: e.message});
    }

 });
 
 // Search api:

 productRouter.get('/api/products/search/:query', auth, async (req, res) => {
  
  try {
      const { query } = req.params;
      const products = await Product.find({
          $or: [
              { name: { $regex: query, $options: "i" } },
              { customer: { $regex: query, $options: "i" } },
              { category: { $regex: query, $options: "i" } }
          ]
      });

      res.json(products);
  } catch (e) {
    res.status(500).json({error: e.message});
  }

 });





 productRouter.post("/api/rate-product", auth, async (req, res) => {
    try {
      const {id, rating} = req.body;
      let product = await Product.findById(id);
      for( let i=0; i<product.ratings.length; i++) {
        if(product.ratings[i].userId == req.user) {
            product.ratings.splice(i, 1);
            break;
        }
      }
      const ratingSchema = {
        userId: req.user,
        rating: rating,
      };
      product.ratings.push(ratingSchema);
      product = await product.save();
      res.json(product);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });





module.exports = productRouter;