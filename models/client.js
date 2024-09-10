const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    telephone: {
        type: String,
        required: true,
        trim: true,
    },
    adresse: {
        type: String,
        required: true,
        trim: true,
    },
    codepostal: {
        type: String,
        required: true,
        trim: true,
    },
    ville: {
        type: String,
        required: true,
        trim: true,
    },
    cin: {
        type: String,
        required: true,
        trim: true,
    },
    
 
});



const Client = mongoose.model('Client', clientSchema);
module.exports = Client;