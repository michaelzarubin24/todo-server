const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  taskText: String,
});

const ToDo = mongoose.model("toDo", toDoSchema);

module.exports = ToDo;
