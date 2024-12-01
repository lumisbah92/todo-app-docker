import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/todos"; // Replace with your backend API URL

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");

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

  // Start editing a todo
  const startEditing = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };

  // Save edited todo
  const saveTodo = async (id) => {
    if (!editingText.trim()) return;
    try {
      await axios.put(`${API_URL}/${id}`, { text: editingText.trim() });
      setEditingTodoId(null);
      setEditingText("");
      fetchTodos(); // Refresh the list
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      style={{
        height: `calc(100vh - 100px)`,
        borderRadius: '20px',
        backgroundColor: '#FFF6E9',
        minWidth: "600px",
        maxWidth: "600px",
        margin: '50px',
        padding: "50px",
        boxSizing: 'border-box',
        fontFamily: "'Roboto', sans-serif",

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        overflow: 'hidden',
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Todo App</h1>
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "10px 20px",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add
        </button>
      </div>
      <div style={{
         height: '100%',
         width: '100%',
         borderRadius: '20px',
         backgroundColor: '#D4EBF8',
         padding: "20px",
         boxSizing: 'border-box',
         fontFamily: "'Roboto', sans-serif",
         overflowX: 'hidden',
         overflowY: 'auto'
      }}>
        <ul style={{ listStyle: "none", padding: "0", marginRight: '10px' }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                background: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                marginBottom: "10px",
                padding: "10px 15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {editingTodoId === todo.id ? (
                <div style={{ display: "flex", flex: 1 }}>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                  <button
                    onClick={() => saveTodo(todo.id)}
                    style={{
                      padding: "8px 12px",
                      background: "#28A745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <span style={{ fontSize: "16px", color: "#333", flex: 1 }}>
                    {todo.text}
                  </span>
                  <div>
                    <button
                      onClick={() => startEditing(todo.id, todo.text)}
                      style={{
                        padding: "8px 12px",
                        background: "#FFC107",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      style={{
                        padding: "8px 12px",
                        background: "#FF5252",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
