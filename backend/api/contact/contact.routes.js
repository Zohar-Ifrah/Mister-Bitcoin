const express = require('express');
const router = express.Router();
const contactController = require('./contact.controller');

// Route to get all contacts or query them
router.get('/', contactController.query);

// Route to get a specific contact by ID
router.get('/:id', contactController.get);

// Route to add a new contact
router.post('/', contactController.add);

// Route to update a contact by ID
router.put('/:id', contactController.update);

// Route to delete a contact by ID
router.delete('/:id', contactController.remove);

// Route to delete all contacts
router.delete('/', contactController.removeAll);

module.exports = router;
