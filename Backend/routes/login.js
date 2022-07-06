const login_controller= require( "../controllers/login_controller");
const router = require("express").Router();
// router.route("/logout").get(login_controller.logout);
router.route("/login").post(login_controller.login);
router.route("/login_check").post(login_controller.login_check);
router.route('/googleLogin').post(login_controller.googleLogin);
module.exports = router;
