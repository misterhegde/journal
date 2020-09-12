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

import { useDispatch, useSelector } from "react-redux";

import { DELETE_ITEM, LOAD_ALL_TASKS } from "./../reducers/TasksReducer";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = dummy;

export const TableData = () => {
  const allTasks = useSelector((state) => {
    return state.taskReducer;
  });
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState();
  const [editItem, setEditItem] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setRows(allTasks);
  }, [allTasks]);
  const classes = useStyles();

  return (
    <>
      <Paper>
        <Button>
          <AddCircleIcon fontSize="large" onClick={() => setOpen(true)} />
        </Button>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>Dessert (100g serving)</TableCell> */}
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Task/item</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <TableRow key={row.title}>
                    {/* <TableCell component="th" scope="row">
                  {row.name}
                </TableCell> */}
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        setEditItem(row);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        dispatch({ type: DELETE_ITEM, payload: row.id })
                      }
                    >
                      Delete
                    </Button>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <DialogComponent
        open={open}
        setDialogState={() => setOpen(false)}
        currentItem={editItem}
      />
    </>
  );
};
