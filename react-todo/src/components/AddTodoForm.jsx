import React, { useState } from "react";

export default function AddTodoForm({ addTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add new todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="add-todo-input"
      />
      <button type="submit" data-testid="add-todo-btn">
        Add
      </button>
    </form>
  );
}
