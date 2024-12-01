const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];

// Get all todos
app.get("/todos", (req, res) => res.json(todos));

// Add a new todo
app.post("/todos", (req, res) => {
    todos.push(req.body);
    console.log("New todo added = ", req.body);
    res.status(201).json(req.body);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
    todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
    console.log("Current todos after deleting = ", todos);
    res.status(204).end();
});

// Edit a todo
app.put("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        todo.text = text;
        console.log(`Todo with id ${id} updated to = `, todo);
        res.status(200).json(todo);
    } else {
        res.status(404).json({ error: "Todo not found" });
    }
});

// Start the server
app.listen(4000, () => console.log("Backend running on port 4000"));
