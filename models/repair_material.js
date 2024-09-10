const mongoose = require("mongoose");

const RepairMaterialSchema = mongoose.Schema({
    marque: {
        type: String,
        required: true,
        trim: true,
    },
    serie: {
        type: String,
        required: true,
        trim: true,
    },
    panne: {
        type: String,
        required: true,
        trim: true,
    },
    traveaux: {
        type: String,
        required: true,
        trim: true,
    },
    nomclient: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: String,
        required: true,
        trim: true,
    },
    reparateur: {
        type: String,
        required: true,
        trim: true,
    },
    montant: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
    },
    
    documents: [{
        type: String,
        required: true,
    }],
 
});



const RepairMaterial = mongoose.model('RepairMaterial', RepairMaterialSchema);
module.exports = RepairMaterial;