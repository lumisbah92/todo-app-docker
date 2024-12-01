import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/todos"; // Replace with your backend API URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add a new todo
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const todo = { id: Date.now(), text: newTodo.trim() };
    try {
      await axios.post(API_URL, todo);
      setNewTodo("");
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>To-Do App</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button onClick={addTodo} style={{ padding: "10px 20px" }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ padding: "5px 10px", background: "red", color: "white", border: "none" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
