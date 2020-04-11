const jwt = require("jsonwebtoken");
const { promisify }  = require("util");
const User = require("./models/User");

module.exports = {
	async getUserById(call, callback) {
		const { id } = call.request;

		const user = await User.findById(id).select("-password");

		if(!user){
			return callback({ error: "User not found" });
		}

		return callback(null, { user: { ...user.toObject(), id: user._id } });
	},

	async registerUser(call, callback) {
		const { email, username, password } = call.request.user;

		const user = await User.create({ email, username, password });

		return callback(null, { user: { ...user.toObject(), id: user._id } });
	},

	async loginUser(call, callback) {

		const { email, password } = call.request.user;
		
		const user = await User.findOne({ email });

		if(!user){
			return callback({ error: "User not found" });
		}

		if(!await user.compareHash(password)){
			return callback({ error: "Invalid password" });
		}

		return callback(null, {
			token: User.generateToken(user),
		});
	},

	async authenticate(call, callback) {
		const { token: fullToken } = call.request;

		if(!fullToken) {
			callback({ error: "No token provided" });
		}

		const parts = fullToken.split(' ');

		if(!parts.length === 2){
			return callback({ error: "Token error" });
		}

		const [scheme, token] = parts;

		if(!/^Bearer$/i.test(scheme)) {
			return callback({ error: "Token malformatted" });
		}

		try {

			const decoded = await promisify(jwt.verify)(token, "secret");

			const user = await User.findById(decoded.id);

			return callback(null, { user: { ...user.toObject(), id: user._id }});

		} catch(err) {
			callback({ error: "Token invalid" });
		}
	}
};