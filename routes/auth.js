const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");

// enable validation
const { check, validationResult } = require("express-validator/check");

// @route GET api/auth
// @desc Get logged in user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route POST api/auth
// @desc Auth user and get token
// @access Public
router.post(
  "/",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Please provide a password").exists(),
  ],
  async (req, res) => {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      // check if user exists
      if (!user) {
        return res.status(400).json({ msg: "User is not registered" });
      }

      // check if password is valid
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Password does not match" });
      }

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
);

module.exports = router;
