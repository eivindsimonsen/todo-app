import { useState, useEffect } from "react";
import "./sass/style.scss";
import Todo from "./Todo";
import { db } from "./firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  // Create todos
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      setError(true);
      return;
    } else {
      setError(false);
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read todos
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todos
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todos
  const deleteTodo = async (id) => {
    const confirmed = window.confirm("Before proceeding with the deletion of the todo item, please confirm that you want to permanently delete this item. This action cannot be undone. Do you wish to continue?");

    if (confirmed) {
      await deleteDoc(doc(db, "todos", id));
    }
  };

  return (
    <div className="wrapper">
      <div className="todo-container">
        <h1>All todos</h1>
        <form
          onSubmit={createTodo}
          className="todos">
          <div className="todos-action">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="todos-input"
              placeholder="Enter your todo here..."
            />
            <button>+</button>
          </div>
          <div className={"alert-error " + (error ? "alert-error-visible" : "")}>Please fill the field</div>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </form>
        {todos.length >= 1 && <p className="todo-container-quantity">{`You have ${todos.length} todos`}</p>}
      </div>
    </div>
  );
}

export default App;