const { request } = require("express");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Card = require("../models/Card");
// @route GET api/cards
// @desc Gets list of cards
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const cards = await Card.find({ user: req.user.id }).sort({ date: -1 });
    console.log(req.user.id);
    res.json(cards);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
// @route POST api/cards
// @desc Adds a new card
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Email is required").isEmail(),
    ],
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // create a card for a user
    const { name, email, phone, type } = req.body;
    try {
      const newCard = new Card({ name, email, phone, type, user: req.user.id });
      const card = await newCard.save();
      res.json(card);
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  }
);
// @route PUT api/cards/:id
// @desc Edits a card
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  contactUpdate = {};
  if (name) contactUpdate.name = name;
  if (email) contactUpdate.email = email;
  if (phone) contactUpdate.phone = phone;
  if (type) contactUpdate.type = type;

  try {
    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json("Card does not exist");
    }
    if (card.user.toString() !== req.user.id)
      return res.status(401).json("Not authorized");

    card = await Card.findByIdAndUpdate(
      req.params.id,
      { $set: contactUpdate },
      { new: true }
    );
    res.json(card);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});
// @route DELETE api/cards/:id
// @desc Delete user's card
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json("Card does not exist");
    }
    if (card.user.toString() !== req.user.id)
      return res.status(401).json("Not authorized");

    await Card.findByIdAndRemove(req.params.id);
    res.status(200).json("Card is removed");
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
