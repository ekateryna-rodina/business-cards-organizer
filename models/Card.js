const mongoose = require("mongoose");
// init user model
const CardSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    default: "Personal",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", CardSchema);
