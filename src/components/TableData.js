import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import DialogComponent from "./Dialog";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";

import { DELETE_ITEM } from "./../reducers/TasksReducer";
import MediaCard from "./CardComponent";

// const useStyles = makeStyles({
//   table: {
//     minWidth: 350,
//     maxWidth: "100%",
//   },
// });

export const TableData = () => {
  const allTasks = useSelector((state) => {
    return state.task;
  });

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState();
  const [editItem, setEditItem] = useState("");
  const [search, setSearch] = useState("");
  const [searchByDate, setSearchByDate] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setRows(allTasks);
  }, [allTasks]);

  const editJournal = (item) => {
    setEditItem(item);
    setOpen(true);
  };

  const deleteJournal = (journalId) => {
    dispatch({ type: DELETE_ITEM, payload: journalId });
  };

  if (search === "") {
    var filtered = rows;
  } else {
    filtered = rows.filter((element) =>
      element.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (searchByDate === "") {
    var filteredByDate = filtered;
  } else {
    filteredByDate = filtered.filter(
      (element) => element.date === searchByDate
    );
  }

  let cards =
    filteredByDate &&
    filteredByDate.map((row) => (
      <MediaCard
        id={row.id}
        date={row.date}
        title={row.title}
        edit={editJournal}
        deletekey={deleteJournal}
        item={row}
        image={row.image}
      />
    ));

  return (
    <>
      <div>
        <input
          style={{ width: "90%", margin: " auto 10px ", height: "35px" }}
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              format="MM/dd/yyyy"
              value={searchByDate}
              placeholder="Search by date"
              onChange={(e) => setSearchByDate(e.toLocaleString())}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <button onClick={() => setSearchByDate("")}>clear date</button>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <br />
      <br />

      <div>
        {cards}
        <DialogComponent
          open={open}
          setDialogState={() => setOpen(false)}
          currentItem={editItem}
        />
      </div>

      <Button
        style={{
          position: "fixed",
          right: "0%",
          bottom: "0",
          zIndex: "1",
        }}
      >
        <AddCircleIcon
          fontSize="large"
          color="primary"
          onClick={() => {
            setOpen(true);
            setEditItem("");
          }}
        />
      </Button>
    </>
  );
};
