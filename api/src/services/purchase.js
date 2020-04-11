const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

const loaderConfig = require("../config/proto");

const purchaseDef = protoLoader.loadSync( 
	path.resolve(__dirname, "..", "pb", "purchase.proto"), 
	loaderConfig
);

const purchase = grpc.loadPackageDefinition(purchaseDef);

const purchaseClient = new purchase.PurchaseService("localhost:3335", grpc.credentials.createInsecure())

module.exports = purchaseClient;