// stores the people showing interest in a listed product 
const mongoose = require("mongoose");


const interestSchema = new mongoose.Schema({
    Productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    date: { type: Date, default: Date.now },
    offeredBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});


module.exports = mongoose.model("Interest", interestSchema);
