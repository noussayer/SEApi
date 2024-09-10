const express = require('express');
const admin = require('../middelwares/admin');
const mongoose = require('mongoose');
const RepairMaterial = require('../models/repair_material');
const repairMaterialRouter = express.Router();



// Add a material:
repairMaterialRouter.post('/api/add-material', admin, async (req, res) => {
    try {
        const {marque, serie, panne, traveaux, nomclient, telephone, reparateur, montant, date, documents} = req.body;
        let repairmaterial = new RepairMaterial({
            marque,
            serie,
            panne,
            traveaux,
            nomclient,
            telephone,
            reparateur,
            montant,
            date,
            documents,
        });
        repairmaterial = await repairmaterial.save();
        res.json(repairmaterial);


    } catch(e) {
        res.status(500).json({error: e.message});
    }
} );

// Get all products:

repairMaterialRouter.get('/api/get-materials', admin, async (req, res) => {
    try {
        const materials = await RepairMaterial.find({});
        res.json(materials);

    } catch(e) {
        res.status(500).json({error: e.message});
    }

 });



 // delete product:

 repairMaterialRouter.post('/api/delete-material', admin, async(req, res) => {
    try {
        const {id} = req.body;
        let material = await RepairMaterial.findByIdAndDelete(id);
        
        res.json(material);

    } catch(e) {
        res.status(500).json({error: e.message});
    }

 });
// Update Material
 repairMaterialRouter.put('/api/update-material/:id', admin, async (req, res) => {
    try {
      const id = req.params.id;
      const updatedMaterial = await RepairMaterial.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedMaterial) {
        return res.status(404).send({ message: 'Material not found' });
      }
      res.send(updatedMaterial);
    } catch (error) {
      res.status(500).send({ message: 'Error updating Material' });
    }
  
  });

  // Search :

  repairMaterialRouter.get('/api/search-material/:query', admin, async (req, res) => {
  
    try {
        const { query } = req.params;
        const materials = await RepairMaterial.find({
            $or: [
                { marque: { $regex: query, $options: "i" } },
                { serie: { $regex: query, $options: "i" } },
                { nomclient: { $regex: query, $options: "i" } },
                { panne: { $regex: query, $options: "i" } },
                { telephone: { $regex: query, $options: "i" } }
            ]
        });
  
        res.json(materials);
    } catch (e) {
      res.status(500).json({error: e.message});
    }
  
   });

 

  
  

module.exports = repairMaterialRouter;
