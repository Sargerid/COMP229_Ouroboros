const express = require('express');
const { jwtAuthorization, api } = require('../utility');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();
router.post('/signin', api(AuthController.signin));
router.get('/signout', jwtAuthorization, api(AuthController.signout));

module.exports = router;
