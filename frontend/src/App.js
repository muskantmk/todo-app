import React, { useState, useEffect } from "react";

function App() {

  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch("http://127.0.0.1:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  };

  const addTodo = () => {
    fetch("http://127.0.0.1:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task })
    })
    .then(() => {
      setTask("");
      fetchTodos();
    });
  };

  const deleteTodo = (id) => {
    fetch(`http://127.0.0.1:5000/todos/${id}`, {
      method: "DELETE"
    })
    .then(fetchTodos);
  };

  return (
    <div style={{padding:"20px"}}>
      <h1>Todo App</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTodo}>
        Add
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo[0]}>
            {todo[1]}
            <button onClick={() => deleteTodo(todo[0])}>
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
