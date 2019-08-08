import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodo }) => {
  return (
    <li className="todo-item" onClick={() => toggleTodo(todo.id)}>
      <input type="checkbox" checked={todo.complete} onChange={() => ""} />
      <label>
        <span className="custom-checkbox" />
        {todo.name}
      </label>
    </li>
  );
};

const renderTodosCount = list => {
  const incompleteTodosCount = list.todos.filter(
    todo => todo.complete === false
  ).length;
  const todoString = incompleteTodosCount === 1 ? "task" : "tasks";

  return `${incompleteTodosCount} ${todoString} remaining`;
};

function Todos({
  list,
  createTodo,
  toggleTodo,
  clearCompleteTodos,
  deleteList
}) {
  const [inputTodo, setInputTodo] = useState("");

  return (
    <div className="todos-container">
      <div className="todos-header">
        <h1 className="todos-title">{list.name}</h1>
        <p className="todos-counter">{renderTodosCount(list)}</p>
      </div>
      <div className="todo-body">
        <ul className="all-todos">
          {list.todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={id => toggleTodo(id)}
            />
          ))}
        </ul>
      </div>
      <form
        className="todo-form"
        onSubmit={e => {
          e.preventDefault();
          if (!inputTodo || inputTodo.length < 3) return;
          createTodo({
            id: Date.now().toString(),
            name: inputTodo,
            complete: false
          });
          e.target.reset();
        }}
      >
        <input
          onChange={e => setInputTodo(e.target.value)}
          type="text"
          className="input input-todo"
          placeholder="Add New Task"
        />
        <button className="btn btn-list">+</button>
      </form>

      <div className="delete-buttons">
        <button
          className="btn delete-todos"
          onClick={() => clearCompleteTodos()}
        >
          Clear completed tasks
        </button>
        <button className="btn delete-list" onClick={() => deleteList()}>
          Delete List
        </button>
      </div>
    </div>
  );
}

export default Todos;
