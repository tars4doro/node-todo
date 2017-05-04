const express = require('express');
const router = express.Router();
const controllers = require("../controllers");
const middleware = require("../middleware");
const passport = require('passport');


router.get('/', middleware.isLoggedIn, controllers.front_controller.index);
router.get('/login', middleware.isNotLoggedIn, controllers.auth_controller.login_get);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), controllers.auth_controller.login_post);
router.post('/register', controllers.auth_controller.register_post);
router.get('/logout', controllers.auth_controller.logout_get);

router.post('/addtask', controllers.front_controller.todo_add);
router.post('/completetask', controllers.front_controller.todo_complete);
router.post('/deletetask', controllers.front_controller.todo_delete);

module.exports = router;
