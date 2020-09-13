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
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { useDispatch } from "react-redux";
import { ADD_ITEM, UPDATE_ITEM } from "../reducers/TasksReducer";

export default function DialogComponent(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(props.open);
  const [item, setItem] = useState({
    title: "",
    // date: new Date("2014-08-18T21:11:54"),
    date: "",
    image: "",
  });

  useEffect(() => {
    setOpen(props.open);
    setItem(props.currentItem);
  }, [props]);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const fileSelect = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setItem({ ...item, image: base64 });
    // console.log("base64", base64);
  };

  const addOrEditTask = () => {
    props.setDialogState();
    if (props.currentItem) {
      dispatch({ type: UPDATE_ITEM, payload: item });
    } else {
      console.log(item.date);
      const payload = {
        id: uuid.v4(),
        title: item.title,
        date: item.date,
        image: item.image,
      };
      dispatch({ type: ADD_ITEM, payload: payload });
    }
  };

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add/Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            fullWidth
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
          <input type="file" onChange={(e) => fileSelect(e)} />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={item.date}
                onChange={(e) => setItem({ ...item, date: e.toLocaleString() })}
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
