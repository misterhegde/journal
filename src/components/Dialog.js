import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
import * as uuid from "uuid";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { ADD_ITEM, UPDATE_ITEM } from "../reducers/TasksReducer";

import moment from "moment";

// import TextField from "@material-ui/core/TextField";

export default function DialogComponent(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(props.open);
  const [item, setItem] = useState({
    title: "",
    // date: new Date("2014-08-18T21:11:54"),
    date: "",
  });

  useEffect(() => {
    setOpen(props.open);
    setItem(props.currentItem);
  }, [props]);

  // const someMethod
  const addOrEditTask = () => {
    props.setDialogState();
    if (props.currentItem) {
      dispatch({ type: UPDATE_ITEM, payload: item });
      setItem({});
    } else {
      console.log(item.date);
      const payload = {
        id: uuid.v4(),
        title: item.title,
        date: item.date,
      };
      dispatch({ type: ADD_ITEM, payload: payload });
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick>
        Open form dialog
      </Button> */}
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add/Edit</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Edit your journal here</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={item.date}
                onChange={(e) => setItem({ ...item, date: e.toLocaleString() })}
                value={item.date}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setDialogState();
              setOpen(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={() => addOrEditTask()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
