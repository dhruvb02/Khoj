// stores the offers peiple are making on a request/product
const mongoose = require("mongoose");


const offerSchema = new mongoose.Schema({
    Productid: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
    date: { type: Date, default: Date.now },
    offeredBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offerTitle: { type: String, required: true },
    offerAmount: { type: Number, required: true },
    offerDescription: { type: String }, //optional
    offerCondition: { type: String }, // condition of the product they are offering
    offerLocation: { type: String }, //optional
    offerStatus: { type: String, required: true, default: "pending" }, // pending, accepted, rejected
});


module.exports = mongoose.model("Offer", offerSchema);