const express = require('express');
const admin = require('../middelwares/admin');
const mongoose = require('mongoose');
const Client = require('../models/client');

const clientRouter = express.Router();



// Add a material:
clientRouter.post('/api/add-client', admin, async (req, res) => {
    try {
        const {name, telephone, adresse, codepostal, ville, cin} = req.body;
        let client = new Client({
            name,
            telephone,
            adresse,
            codepostal,
            ville,
            cin,
        });
        client = await client.save();
        res.json(client);


    } catch(e) {
        res.status(500).json({error: e.message});
    }
} );

// Get all the clients:
clientRouter.get('/api/get-clients', admin, async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);

    } catch(e) {
        res.status(500).json({error: e.message});
    }

 });

 // Delete the product: 
 clientRouter.post('/api/delete-client', admin, async(req, res) => {
    try {
        const {id} = req.body;
        let client = await Client.findByIdAndDelete(id);
        
        res.json(client);

    } catch(e) {
        res.status(500).json({error: e.message});
    }

 })

 // update client:
 clientRouter.put('/api/update-client/:id', admin, async (req, res) => {
    try {
      const id = req.params.id;
      const updatedClient = await Client.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedClient) {
        return res.status(404).send({ message: 'Client not found' });
      }
      res.send(updatedClient);
    } catch (error) {
      res.status(500).send({ message: 'Error updating product' });
    }
  
  });

  // Search:
 clientRouter.get('/api/search-client/:query', admin, async (req, res) => {
  
    try {
        const { query } = req.params;
        const clients = await Client.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { telephone: { $regex: query, $options: "i" } },
                { ville: { $regex: query, $options: "i" } }
                
            ]
        });
  
        res.json(clients);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  
   });


module.exports = clientRouter;
