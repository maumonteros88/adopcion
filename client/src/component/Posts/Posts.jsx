import React, { useState, useEffect } from "react";
import useStyle from "./style";
import { CircularProgress, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "../Posts/Post/Post";
import { getPosts } from "../../redux/postSlice";


const Posts = ({setCurrentId}) => {
  const posts = useSelector(getPosts);
  const [data, setData] = useState([]);
  
  const classes = useStyle();

  
  useEffect(() => {
    setData(posts);   
  }, [posts]);

  
  return !data.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
