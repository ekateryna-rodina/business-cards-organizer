const express = require('express');
const  router = express.Router();

// @route GET api/cards
// @desc Gets list of cards
// @access Private
router.get('/', (req, res) => {
    res.send("Get all user's cards");
})
// @route POST api/cards
// @desc Adds a new card
// @access Private
router.post('/', (req, res) => {
    res.send("Adds a new card");
})
// @route PUT api/cards/:id
// @desc Edits a card
// @access Private
router.put('/:id', (req, res) => {
    res.send("Edits user's card");
})
// @route DELETE api/cards/:id
// @desc Delete user's card
// @access Private
router.delete('/:id', (req, res) => {
    res.send("Deletes user's card");
})
module.exports = router;