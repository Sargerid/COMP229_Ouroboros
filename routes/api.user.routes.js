const express = require('express');
const { jwtAuthorization, api } = require('../utility');
const UserController = require('../controllers/user.controller');

const router = express.Router();
router.post('/', api(UserController.createUser));
router.get('/', api(UserController.listUsers));
router.get('/:userId', jwtAuthorization, api(UserController.fetchUser));
router.put('/:userId', jwtAuthorization, api(UserController.updateUser));
router.delete('/:userId', jwtAuthorization, api(UserController.deleteUser));

module.exports = router;
