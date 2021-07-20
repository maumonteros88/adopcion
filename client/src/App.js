import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from "./component/Posts/Posts";
import Form from "./component/Form/Form";
import huella from "./images/huellaGif.gif";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPosts } from "./redux/postSlice";
import useStyle from "./style";
import { useEffect, useState } from "react";

function App() {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyle();
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h3" align="center">
          Adopcion
        </Typography>
        <img
          className={classes.image}
          src={huella}
          alt="memories"
          height="100"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container={true}
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
