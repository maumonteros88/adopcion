import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import FormHelperText from '@material-ui/core/FormHelperText'
import useStyle from "../../Form/style";

const MauInput = ({ name, label }) => {
  const classes = useStyle();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <TextField
        {...register(name)}
        name={name}
        variant="outlined"
        label={label}
        fullWidth={true}
      />
      {errors?.[name] && <FormHelperText className={classes.errors}>{errors?.[name]?.message}</FormHelperText>}
    </>
  );
};

export default MauInput;
