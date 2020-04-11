const UserService = require("../services/user");

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		UserService.authenticate({ token }, (err, response) => {
			if(err) return res.status(400).json(err);

			req.userId = response.user.id;

			next();
		});
	} catch( err ) {
		return res.status(401).send({ error: "Token inválido" });
	}
}