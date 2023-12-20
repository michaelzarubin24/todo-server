const ToDo = require("./schema/Todo");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://dbMichael:p3H3Fc8EMHBLHovB@cluster0.rr2pz7s.mongodb.net/test",
  {
    dbName: "test",
  },
  {
    collection: "todos",
  }
);

app.get("/api/get-todo-form", (req, res) => {
  ToDo.find({})
    .then((toDo) => {
      res.json(toDo);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/api/todo-form", (req, res) => {
  const { taskText } = req.body;

  if (!taskText) {
    return res.status(400).json({ error: "Task text is required" });
  }

  const newToDo = new ToDo({
    taskText: taskText,
  });

  newToDo
    .save()
    .then(() => {
      res.json({ message: "Task added successfully!" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/api/remove-task", (req, res) => {
  const { taskText } = req.body;

  ToDo.findOneAndDelete({ taskText })
    .then(() => {
      res.status(200).json({ message: "Task removed successfully!" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.listen(3000, () => {
  console.log("Server was successfully launched!");
});
