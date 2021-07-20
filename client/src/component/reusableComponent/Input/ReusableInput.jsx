import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";
import useStyle from "../../Form/style";

const ReusableInput = ({ name, label, data }) => {
  const test = data;
  const classes = useStyle();  

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    
    setValue(name, test, {
      shouldDirty: true,
    });
  }, [data]);

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            variant="outlined"
            label={label}
            value={value}
            fullWidth={true}
            onChange={onChange}
          />
        )}
        name={name}
        defaultValue=""
      />
      {errors?.[name] && (
        <FormHelperText className={classes.errors}>
          {errors?.[name]?.message}
        </FormHelperText>
      )}
    </>
  );
};

export default ReusableInput;
