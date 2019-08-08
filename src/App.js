import React, { useState, useEffect } from "react";

import "./App.css";
import Lists from "./componets/Lists";
import Todos from "./componets/Todos";

function App() {
  const fetchedLists = () => JSON.parse(localStorage.getItem("lists")) || [];
  const fetchedActiveListId = () =>
    localStorage.getItem("active-list-id") || null;

  const [lists, setLists] = useState(fetchedLists);
  const [activeListId, setActiveListId] = useState(fetchedActiveListId);

  const save = activeList => {
    setLists(
      lists.map(list => {
        if (activeList.id === list.id) return activeList;
        else return list;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("active-list-id", activeListId);
  }, [lists, activeListId]);

  return (
    <div className="app-body">
      <h1 className="title-header header">React Better Todo List</h1>
      <Lists
        lists={lists}
        setLists={setLists}
        activeListId={activeListId}
        selectList={id => setActiveListId(id)}
      />

      {activeListId ? (
        <Todos
          list={lists.find(list => list.id === activeListId)}
          createTodo={todo => {
            const activeList = lists.find(list => list.id === activeListId);
            activeList.todos.push(todo);
            save(activeList);
          }}
          toggleTodo={id => {
            const activeList = lists.find(list => list.id === activeListId);
            activeList.todos.forEach(todo => {
              if (todo.id === id) todo.complete = !todo.complete;
            });
            save(activeList);
          }}
          clearCompleteTodos={() => {
            const activeList = lists.find(list => list.id === activeListId);
            activeList.todos = activeList.todos.filter(todo => !todo.complete);
            save(activeList);
          }}
          deleteList={() => {
            setActiveListId(null);
            setLists(lists.filter(list => list.id !== activeListId));
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
