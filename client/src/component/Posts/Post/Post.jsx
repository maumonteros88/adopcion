import React from "react";
import useStyle from "./style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { fetchPosts } from "../../../redux/postSlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import apiConnect from "../../../api/configApi";
import swal from "sweetalert";
import moment from "moment";
import "moment/locale/es";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      await apiConnect.delete(`/posts/deletePost/${id}`);
      dispatch(fetchPosts());
      swal("Publicacion Borrada!", "Tu publicacion fue borrada!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.name}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => {
            setCurrentId(post._id);
          }}>
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h6">
          Nombre: {post.name}
        </Typography>
        <Typography className={classes.details} variant="subtitle1">
          Rasgos: {post.rasgos}
        </Typography>
        <Typography className={classes.details} variant="subtitle1">
          Tipo: {post.type}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth={true}>
          Adoptar
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            handleDelete(post._id);
          }}>
          <DeleteIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
