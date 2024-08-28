const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Route to get all users or query them
router.get('/', userController.query);

// Route to get a specific user by ID
router.get('/:id', userController.get);

// Route to add a new user
router.post('/', userController.add);

// Route to update a user by ID
router.put('/:id', userController.update);

// Route to delete a user by ID
router.delete('/:id', userController.remove);

// Route to delete all users
router.delete('/', userController.removeAll);

module.exports = router;
