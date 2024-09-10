// Import from packages:
const express = require('express');
const mongoose = require('mongoose');


// Import from other files:
const authRouter = require("./routes/auth");
const adminRouter = require('./routes/admin');
const productRouter = require("./routes/product");
const pdfRouter = require('./routes/pdf');
const repairMaterialRouter = require('./routes/repair_material');
const clientRouter = require('./routes/client');


// INIT:
const PORT = 3000;
const app = express();
const DB= "Chaine de connexion";

// Middleware:
app.use(express.json());
app.use(repairMaterialRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(pdfRouter);
app.use(clientRouter);


// Connection:
mongoose
.connect(DB)
.then( () => {
    console.log('Connection Successful');
}).catch(e => {
    console.log(e);
});




app.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port ${PORT}`);
});