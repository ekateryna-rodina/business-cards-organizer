const express = require("express");
const connectDB = require("./config/db");

// init express
const app = express();
const PORT = process.env.PORT || 5000;

// connect db
connectDB();

// init middleware
// accept data
app.use(express.json({ extended: false }));

// define routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/cards", require("./routes/cards"));

// run server
app.listen(PORT, () => console.log(`Server is started on port ${PORT}...`));
