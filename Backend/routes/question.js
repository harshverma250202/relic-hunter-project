const auth = require("../middleware/auth_middleware");
const is_admin = require("../middleware/admin_middleware");
const question_controller = require("../controllers/question_controller");
const router = require("express").Router();


router.post("/create_question",question_controller.create_question);
router.post("/update_question",question_controller.update_question);
router.post("/get_question",auth,question_controller.get_question);
router.post("/submit_response",auth,question_controller.submit_response);
module.exports = router;