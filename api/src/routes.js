const { Router } = require("express");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const PurchaseController = require("./controllers/PurchaseController");

const AuthMiddleware = require("./middlewares/auth");

const router = Router();

router.get("/users/:id", UserController.show);
router.post("/users", UserController.store);

router.post("/sessions", SessionController.store);

router.use(AuthMiddleware);

router.get("/purchases", PurchaseController.index);
router.get("/purchases/:id", PurchaseController.show);
router.post("/purchases", PurchaseController.store);

module.exports = router;