const { register } = require("../controllers/userController");
const { login } = require("../controllers/userController");
const { logout } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout/:id", logout);

module.exports = router;