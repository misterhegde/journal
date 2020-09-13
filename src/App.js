import React from "react";
import "./App.css";
// import dummy from "./dummy.json";
import { useDispatch } from "react-redux";

import { TableData } from "./components/TableData";
// import { LOAD_ALL_TASKS } from "./reducers/TasksReducer";

function App() {
  // useEffect(() => {
  //   dispatch({ type: LOAD_ALL_TASKS, payload: dummy });
  // }, []);

  const dispatch = useDispatch();

  return (
    <div>
      <TableData />
    </div>
  );
}

export default App;
