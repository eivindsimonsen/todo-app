import React from "react";

function Todo({ todo, toggleComplete, deleteTodo }) {
  return (
    <li className="todos-list-container">
      <div className={todo.completed ? "input-checked" : ""}>
        <input
          onChange={() => toggleComplete(todo)}
          checked={todo.completed ? "checked" : ""}
          type="checkbox"
        />
        <p onClick={() => toggleComplete(todo)}>{todo.text}</p>
        <i
          onClick={() => deleteTodo(todo.id)}
          className="fa-solid fa-trash-can"></i>
      </div>
    </li>
  );
}

export default Todo;
