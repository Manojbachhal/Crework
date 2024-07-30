const TaskModel = require("../models/task.model");
const createTask = async (data) => {
  // let dataBody = { ...data, status };

  data.todo = data.status == "todo" ? true : false;
  data.inprogress = data.status == "inprogress" ? true : false;
  data.underReview = data.status == "underReview" ? true : false;

  delete data.status;
  let newTask = await new TaskModel(data);

  await newTask.save();
  return {
    status: 201,
    res: newTask,
  };
};

const updateTask = async (id, column) => {
  try {
    let updateFields = {
      todo: false,
      inprogress: false,
      underReview: false,
      done: false,
    };

    if (column == "todo") updateFields.todo = true;
    if (column == "inprogress") updateFields.inprogress = true;
    if (column == "underReview") updateFields.underReview = true;
    if (column == "done") updateFields.done = true;

    let updatedTask = await TaskModel.findByIdAndUpdate(id, updateFields);

    if (!updatedTask) {
      return {
        status: 404,
        res: "Task not found",
      };
    }

    return {
      status: 200,
      res: updatedTask,
    };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      status: 500,
      res: "Error updating task",
    };
  }
};

const getTask = async (user) => {
  let id = user._id;

  let tasks = await TaskModel.find({ User: id });
  const data = {
    todo: [],
    inprogress: [],
    underReview: [],
    done: [],
  };

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString().split(",")[0] : null;
  };

  const timeSinceCreation = (date) => {
    let formatedDate = new Date(date);
    const diffInMs = Date.now() - formatedDate;
    const diffDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays == 0) {
      return `${diffHours} Hours ago`;
    }
    return `${diffDays} ago`;
  };

  // Categorize tasks

  tasks.forEach((task) => {
    const formattedTask = {
      ...task._doc,
      deadline: formatDate(task.deadline),
      createdAt: timeSinceCreation(task.createdAt),
    };

    if (task.todo) data.todo.push(formattedTask);
    if (task.inprogress) data.inprogress.push(formattedTask);
    if (task.underReview) data.underReview.push(formattedTask);
    if (task.done) data.done.push(formattedTask);
  });
  // let conunt = 0;
  // console.log(data.length);
  return {
    status: 200,
    res: data,
  };
};

module.exports = getTask;

module.exports = getTask;

module.exports = {
  createTask,
  updateTask,
  getTask,
};
