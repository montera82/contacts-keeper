const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

// @route 	GET api/contacts
// @access 	Private
router.get('/', auth, (req, res) => {
	res.send('Gets all contacts');
})


// @route 	POST api/contacts
// @access 	Private
router.post('/', (req, res) => {
	res.send('Add contact ');
})


// @route 	POST api/contacts/:id
// @access 	Private
router.put('/', (req, res) => {
	res.send('Update a contact');
})

// @route 	POST api/contacts/:id
// @access 	Private
router.delete('/', (req, res) => {
	res.send('Update a contact');
})

module.exports = router
