import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch todo data");
        }
        return response.json();
      })
      .then((data) => setTodos(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-heading">Todo List</h1>
      <input
        className="input"
        type="text"
        value={newTodo}
        onChange={handleInputChange}
      />
      <button className="add-button" onClick={handleAddTodo}>
        Add
      </button>
      {error && <p>Error: {error}</p>}
      <ul>
        {todos.map((todo) => (
          <li className="todo-item" key={todo.id}>
            <button
              className="delete-button"
              onClick={() => handleDelete(todo.id)}
            >
              <BsTrash />
            </button>
            <input
              className="check-box"
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
