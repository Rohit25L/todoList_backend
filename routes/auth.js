const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    console.log();
    const hashpasword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpasword });
    await user.save();
    res.status(200).json("registerd sucessafuly");
  } catch (error) {
    res.status(500).json(error, "user already exisits");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both email and password." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const { password: userPassword, ...others } = user._doc;
    return res.status(200).json({ others });
  } catch (error) {
    res.status(500).json(error, "user already exisits");
  }
});

router.get("/ogdata/:id", async (req, res) => {
  try {
    console.log("Received request for user ID:", req.params.id);
    const auth = await User.findById(req.params.id);
    if (auth) {
      return res.status(200).json(auth);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error: Could not fetch user data." });
  }
});

module.exports = router;
