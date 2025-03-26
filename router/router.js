const Router = require('express').Router

const router = Router()

const media = require('../middlewares/media')
const chekAuth = require('../middlewares/chekAuth')

const AuthController = require('../controller/auth-controller');
const questionController = require('../controller/question-controller');

router.post("/registration", AuthController.registration);
router.post("/login", AuthController.login);

router.get("/getAllQuestions", questionController.getAllQuestions);
router.post("/createQuestion", chekAuth, media.single('media'), questionController.createQuestion);
router.delete("/deleteQuestion/:id", questionController.deleteQuestion);

module.exports = router;
