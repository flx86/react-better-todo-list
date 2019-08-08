import React, { useState } from "react";

function Lists({ lists, setLists, activeListId, selectList }) {
  const [inputListName, setInputListName] = useState("");

  return (
    <div className="lists-container">
      <h1 className="lists-header">My Lists</h1>
      <ul className="all-lists">
        {lists.map(list => (
          <li
            className={
              list.id === activeListId ? "list-item active" : "list-item"
            }
            key={list.id}
            onClick={selectList.bind(this, list.id)}
          >
            {list.name}
          </li>
        ))}
      </ul>

      <form
        className="list-form"
        onSubmit={e => {
          e.preventDefault();
          if (!inputListName || inputListName.length < 3) return;

          setLists([
            {
              ...lists,
              id: Date.now().toString(),
              name: inputListName,
              todos: []
            }
          ]);
          e.target.reset();
        }}
      >
        <input
          onChange={e => setInputListName(e.target.value)}
          type="text"
          className="input"
          placeholder="Add New List Name"
        />
        <button className="btn btn-list">+</button>
      </form>
    </div>
  );
}

export default Lists;
