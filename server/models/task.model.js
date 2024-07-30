const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: { type: String, require: true },

    description: { type: String, require: true },

    priority: { type: String, require: true },

    deadline: { type: Date, require: true },

    User: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    todo: { type: Boolean, default: true },

    inprogress: { type: Boolean, default: false },

    underReview: { type: Boolean, default: false },

    done: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
