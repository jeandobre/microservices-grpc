const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
	userId: String,
	title: String,
	value: Number
}, { collection: "purchases"});

module.exports = mongoose.model("Purchase", PurchaseSchema);
