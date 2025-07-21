const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Comp = require("../models/completead")
const List = require("../models/tlist");


router.post("/completed", async (req, res) => {
  try {
    const { id, title } = req.body;
    const existinguser = await User.findById(id);
    if (existinguser) {
      const completed = new Comp({
        title,
        user: existinguser,
      });

      await completed.save();
      existinguser.List.push(completed);
      existinguser.save();
      res.status(200).json("your task is completed");
    }
     else{
        res.status(404).json("your task is completed");
      }
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/getcompleted/:id", async (req, res) => {
  const list = await Comp.find({ user: req.params.id })
  if (list.length != 0) {
    res.status(200).json({ list });
  } else {
    res.status(200).json({ message: "no task is created" });
  }
});


module.exports = router;