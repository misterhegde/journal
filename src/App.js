import React, { useState, useEffect } from "react";
import "./App.css";
import dummy from "./dummy.json";
import { useDispatch, useSelector } from "react-redux";

import { TableData } from "./components/TableData";
import { LOAD_ALL_TASKS } from "./reducers/TasksReducer";

function App() {
  useEffect(() => {
    console.log("fgfh");

    dispatch({ type: LOAD_ALL_TASKS, payload: dummy });
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className="App-header">
        <TableData />
      </div>
    </div>
  );
}

export default App;
