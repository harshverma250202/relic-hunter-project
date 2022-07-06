const user_controller=require("../controllers/user_controller");
const router=require("express").Router();
const auth = require("../middleware/auth_middleware");

router.post('/current_user_rank',auth,user_controller.current_user_rank);
router.post('/leaderboard',auth,user_controller.leaderboard);
module.exports = router;