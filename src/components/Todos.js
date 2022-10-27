import React, { useState, useEffect } from "react";
import "../App.css";
import { db } from "../ firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    fetchPost();
  };
  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
    });
  };

  const setValue = (e) => {
    setTodo(e.target.value);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Todo-App</h1>

        <div>
          <div>
            <input
              type="text"
              value={todo}
              placeholder="What do you have to do today?"
              onChange={setValue}
            />
          </div>

          <div className="btn-container">
            <button type="submit" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
          <div className="todo-content">
            {todos?.map((todo, i) => (
              <p key={i}>{todo.todo}</p>
            ))}
          </div>
        </div>

        <div className="todo-content">...</div>
      </div>
    </section>
  );
};

export default Todos;
