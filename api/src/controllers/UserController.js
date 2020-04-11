const UserService = require("../services/user");

class UserController {
	async store(req, res){
		const { email, username, password } = req.body;

		UserService.registerUser({ user: { email, username, password }}, (err, response) => {
			if(err) return res.sendStatus(404);
			return res.json(response);
		});

	};

	async show(req, res){
		const { id } = req.params;

		UserService.getUserById({ id: id }, (err, response) => {
			if(err) return res.status(404).json({ erro: err});
			return res.json(response);
		});
	}
}

module.exports = new UserController();