const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// enable validation
const { check, validationResult } = require("express-validator/check");
const { use } = require("./auth");

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "Please enter your name").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password is required to be at least 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const { name, email, password } = req.body;
      try {
        // check if user exists
        let user = await User.findOne({ email });
        if (user) {
          res.status(400).json({ errors: [{ msg: "User already exists" }] });
        }
        // create a new user
        user = new User({
          name,
          email,
          password,
        });
        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save user to db
        await user.save();

        // jwt
        const payload = {
          user: {
            id: user.id,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtSecret"),
          {
            expiresIn: 360000,
          },
          (err, token) => {
            if (err) {
              throw err;
            }

            res.json({ token });
          }
        );
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
    }
  }
);

module.exports = router;
