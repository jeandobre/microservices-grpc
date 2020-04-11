const UserService = require("../services/user");

class SessionController {
	async store(req, res){
		const { email, password } = req.body;

		UserService.loginUser({ user: { email, password }}, (err, response) => {
			if(err) console.log(err);

			return res.json(response);

		});	
	}
}

module.exports = new SessionController();