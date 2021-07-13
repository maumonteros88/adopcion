import React, { useState } from "react";
import { Button, Typography, Paper, CircularProgress } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import schema from "../../validate/createPost";
import ReusableForm from "../reusableComponent/Form/ReusableForm";
import ReusableInput from "../reusableComponent/Input/ReusableInput";
import swal from "sweetalert";
import apiConnect from "../../api/configApi";

import useStyle from "./style";
import "./style.css"
import { fetchPosts } from "../../redux/postSlice";
import { useForm } from "react-hook-form";

const Form = () => {
  const classes = useStyle();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { reset } = useForm();

  const onSubmit = async (data) => {
    if (image !== "") {
      setLoading(true);
      const newPost = { ...data, selectedFile: image.base64 };

      try {
        await apiConnect.post("api/posts/newPost", newPost);
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
  };

  const clear = () => () => {
    reset();
  };
  return (
    <Paper className={classes.paper}>
      <ReusableForm schema={schema} onSubmit={onSubmit}>
        <Typography variant="h6">Crea una publicación</Typography>
        <ReusableInput name="creator" label="Creador" />
        <ReusableInput name="title" label="Titulo" />
        <ReusableInput name="message" label="Mensaje" />
        <ReusableInput name="tags" label="tags" />
        <div className={classes.fileInput}>
       
        <FileBase
        className={classes.fileInput}
          type="file"
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
