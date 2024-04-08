const express = require('express')
const router = express.Router();
const UserController = require('../controller/UserController');

const checkAuth = require('../middleware/auth');
router.post('/auth/login', UserController.login);
router.post('/auth/signup', UserController.register);
router.get('/getUser', checkAuth, UserController.getUser);
router.get('/fetchUsers', UserController.fetchUsers);

module.exports = router;