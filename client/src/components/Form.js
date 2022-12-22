import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodoAsync } from "../redux/todos/todosSlice";

const Form = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const error=useSelector((state)=> state.todos.addNewTodoError)

  const handleSubmit = async (e) => {
    if(!title) return;

    e.preventDefault();
    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  if(error) {
    alert(error);
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default Form;
