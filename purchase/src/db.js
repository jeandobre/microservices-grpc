const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/grpc-purchase", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});