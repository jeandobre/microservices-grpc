const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/grpc-user", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});