import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DialogComponent from "./Dialog";
import dummy from "../dummy.json";
import moment from "moment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import _ from "lodash";

import { useDispatch, useSelector } from "react-redux";

import { DELETE_ITEM, LOAD_ALL_TASKS } from "./../reducers/TasksReducer";

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    maxWidth: "100%",
  },
});

export const TableData = () => {
  const allTasks = useSelector((state) => {
    return state.taskReducer;
  });

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState();
  const [editItem, setEditItem] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setRows(allTasks);
  }, [allTasks]);
  const classes = useStyles();

  if (search === "") {
    var filtered = rows;
  } else {
    filtered = rows.filter((element) =>
      element.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <>
      <input
        style={{ width: "100%", height: "35px", margin: "auto" }}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <br />
      <br />
      <br />
      <div
        style={{
          position: "relative",
        }}
      >
        {/* <Paper className="main"> */}

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Task/item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered &&
                filtered.map((row) => (
                  <TableRow key={row.id}>
                    {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <Button
                      onClick={(e) => {
                        setEditItem(row);
                        setOpen(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </Button>
                    <Button
                      onClick={() =>
                        dispatch({ type: DELETE_ITEM, payload: row.id })
                      }
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button>
          <AddCircleIcon
            fontSize="large"
            align="right"
            onClick={() => {
              setOpen(true);
              setEditItem("");
            }}
            style={{ position: "absolute", right: "auto" }}
          />
        </Button>
        {/* </Paper> */}

        <DialogComponent
          open={open}
          setDialogState={() => setOpen(false)}
          currentItem={editItem}
        />
      </div>
    </>
  );
};
