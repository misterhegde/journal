import React, { useState, useEffect } from "react";
import "./App.css";
import dummy from "./dummy.json";
import { useDispatch, useSelector } from "react-redux";
import SimpleStorage from "react-simple-storage";

import { TableData } from "./components/TableData";
import { LOAD_ALL_TASKS } from "./reducers/TasksReducer";

function App() {
  useEffect(() => {
    dispatch({ type: LOAD_ALL_TASKS, payload: dummy });
  }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <SimpleStorage parent={this} />
      <TableData />
    </div>
  );
}

export default App;
