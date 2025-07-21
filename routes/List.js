const express = require("express");
const router = express.Router();
const User = require("../models/user");
const List = require("../models/tlist");

router.post("/addTask", async (req, res) => {
  try {
    const { id, title, description, date, priority } = req.body;
    const existinguser = await User.findById(id);
    if (existinguser) {
      const list = new List({
        title,
        description,
        date,
        priority,
        user: existinguser,
      });
      await list.save();
      res.status(200).json(list);
      existinguser.List.push(list);
      existinguser.save();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//update
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { userid, title, description, date, priority } = req.body;
      const llist = await List.findByIdAndUpdate(req.params.id, {
        title,
        description,
        date,
        priority,
      })
      await llist.save();
      res.status(200).json("task update");
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { userid } = req.body;
    const taskIdToDelete = req.params.id;
    console.log(userid, taskIdToDelete);
    if (!taskIdToDelete) {
      return res.status(400).json({ message: "Task ID is missing." });
    }
    const updatedUser = await User.findByIdAndUpdate(userid, {
      $pull: { List: taskIdToDelete },
    });
    await List.findByIdAndDelete(taskIdToDelete);
    return res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error: Could not delete task." });
  }
});

router.get("/geTask/:id", async (req, res) => {
  const list = await List.find({ user: req.params.id })

  if (list.length != 0) {
    res.status(200).json({ list });
  } else {
    res.status(200).json({ message: "no task is created" });
  }
});

module.exports = router;
