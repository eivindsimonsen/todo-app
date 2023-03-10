import { useState, useEffect } from "react";
import "./sass/style.scss";
import Todo from "./Todo";
import { db } from "./firebase";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc, where } from "firebase/firestore";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "./context/AuthContext";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // const [userId, setUserId] = useState("");
  const { googleSignIn, user, logOut } = UserAuth();

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
      userId: user.uid,
    });

    setInput("");
  };

  // Read todos
  useEffect(() => {
    if (user?.uid) {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", user.uid) // Filter todos by userId
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArr = [];
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArr);
      });
      return () => unsubscribe();
    }
  }, [user]);

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

  // Sign in
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error);
      console.log(errorMsg);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await logOut();
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error);
      console.log(errorMsg);
    }
  };

  return (
    <div className="wrapper">
      <div className="todo-container">
        <div className="todo-auth">
          <h1>All todos</h1>
          {user?.displayName ? (
            <div className="todo-auth-logout">
              <img
                src={user?.photoURL}
                alt="Google initals"
              />
              <button
                onClick={handleSignOut}
                className="cta">
                Sign Out
              </button>
            </div>
          ) : (
            <GoogleButton
              className="google-button"
              onClick={handleGoogleSignIn}
            />
          )}
        </div>

        <form
          onSubmit={createTodo}
          className="todos">
          <fieldset disabled={user?.displayName ? false : true}>
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
            {user?.displayName ? (
              <>
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
                {todos.length >= 1 && <p className="todo-container-quantity">{`You have ${todos.length} todos`}</p>}
              </>
            ) : (
              <div className="warning-error">You must be logged in to view your todos</div>
            )}
          </fieldset>
        </form>
        {errorMsg != "" && <div className="alert-error alert-error-visible">{errorMsg}</div>}
      </div>
    </div>
  );
}

export default App;
