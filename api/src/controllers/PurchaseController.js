const PurchaseService = require("../services/purchase");

class PurchaseController {
	async index(req, res) {
		const { userId } = req;

		PurchaseService.listPurchases({ userId }, (err, response) => {
			if(err) return res.sendStatus(404);

			return res.json(response);
		});
	}

	async store(req, res) {
		const { userId } = req;
		const { title, value } = req.body;

		PurchaseService.purchase({ purchase: { userId, title, value } }, (err, response) => {
			if(err) return res.sendStatus(500);

			return res.json(response);
		});

	};

	async show(req, res) {
		const { id } = req.params;

		PurchaseService.getPurchaseById({ id }, (err, response) => {
			if(err) return res.sendStatus(404);

			return res.json(response);
		});

	}
}

module.exports = new PurchaseController();