const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
router.post("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, priority, deadline, status } = req.body;

    const response = await taskController.createTask({
      title,
      description,
      priority,
      deadline,
      status,
      User: userId,
    });
    res.status(response.status).send(response.res);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { id, column } = req.body;
    // console.log(id, column);

    const response = await taskController.updateTask(id, column);
    res.status(response.status).send(response.res);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});

router.get("/", async (req, res) => {
  let user = req.user;
  const response = await taskController.getTask(user);
  res.status(response.status).send(response.res);
});
module.exports = router;
