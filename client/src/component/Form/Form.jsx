import React, { useEffect, useState } from "react";
import { Button, Typography, Paper, CircularProgress } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import schema from "../../validate/createPost";
import ReusableForm from "../reusableComponent/Form/ReusableForm";
import ReusableInput from "../reusableComponent/Input/ReusableInput";
import swal from "sweetalert";
import apiConnect from "../../api/configApi";

import useStyle from "./style";
import "./style.css";
import { fetchPosts, getPosts, findPost } from "../../redux/postSlice";
import ReusableSelect from "../reusableComponent/Select/ReusableSelect";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyle();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const post =  useSelector(findPost(currentId));  
  
  useEffect(() => {
    if (currentId) {
      setData(post);
    }
  }, [post]);

  const onSubmit = async (data) => {    
    if (currentId) {
      if (image !== "") {
        setLoading(true);
        const newPost = { ...data, selectedFile: image.base64 };

        try {
          await apiConnect.patch(`/posts/updatePost/${currentId}`, newPost);
          swal("Publicacion actualizada!", "ya esta actualizada!", "success");
          dispatch(fetchPosts());
          setLoading(false);
          setCurrentId(null)         
        } catch (error) {
          setLoading(false);
          console.log(error.message);
        }
      } else {
        swal({
          title: "Debe colocar una foto!",
          text: "Agregue una imagen para continuar!",
          icon: "warning",
        });
      }
    } else {
      if (image !== "") {
        setLoading(true);
        const newPost = { ...data, selectedFile: image.base64 };

        try {
          await apiConnect.post("/posts/newPost", newPost);
          swal("Publicacion Creada!", "Ya esta disponible!", "success");
          dispatch(fetchPosts());
          setLoading(false);
         
        } catch (error) {
          setLoading(false);
          console.log(error.message);
        }
      } else {
        swal({
          title: "Debe colocar una foto!",
          text: "Agregue una imagen para continuar!",
          icon: "warning",
        });
      }
    }
  };

  const clear = () => () => {};
  return (
    <Paper className={classes.paper}>
      <ReusableForm schema={schema} onSubmit={onSubmit}>
        <Typography variant="h6">Crea una publicación</Typography>
        <ReusableInput name="creator" label="Creador" data={data?.creator} />
        <ReusableInput name="name" label="Nombre" data={data?.name} />
        <ReusableInput name="rasgos" label="Rasgos" data={data?.rasgos} />
        <ReusableSelect name="type" label="Tipo" />
        <div className={classes.fileInput}>
          <FileBase
            className={classes.fileInput}
            type="file"
            value={data?.selectedFile}
            multiple={false}
            onDone={(base64) => setImage(base64)}
          />
        </div>

        {!loading ? (
          <>
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth={true}>
              Crear
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={clear}
              fullWidth={true}>
              Borrar
            </Button>
          </>
        ) : (
          <CircularProgress />
        )}
      </ReusableForm>
    </Paper>
  );
};

export default Form;
