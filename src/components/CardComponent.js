import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    maxWidth: "95%",
    margin: "13px auto",

    borderRadius: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 6px 0 rgba(0, 0, 0, 0.25)",
  },
  media: {
    height: 150,
  },
});

export default function MediaCard({
  id,
  title,
  edit,
  date,
  deletekey,
  item,
  image,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="test" />

        <CardContent>
          <Typography variant="body2" component="p">
            {date}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" onClick={() => edit(item)}>
          <EditIcon fontSize="small" />
        </Button>
        <Button color="primary" onClick={() => deletekey(id)}>
          <DeleteIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
}
