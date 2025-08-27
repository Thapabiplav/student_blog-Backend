const { handleLogin, handleRegister } = require("../controllers/userController");
const catchError = require("../util/catchError");

const router = require("express").Router();
router.route('/register').post(catchError(handleRegister))
router.route("/login").post(catchError(handleLogin));

module.exports = router;
