const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

app.get("/todos", (req, res) => res.json(todos));
app.post("/todos", (req, res) => {
    todos.push(req.body);
    console.log("new todo added = ", req.body);
    res.status(201).json(req.body);
});
app.delete("/todos/:id", (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    console.log("current todo after deleting = ", todos);
    res.status(204).end();
});

app.listen(4000, () => console.log("Backend running on port 4000"));
