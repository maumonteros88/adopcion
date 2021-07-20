import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useStyle from "../../Form/style";

const ReusableSelect = ({ name, label }) => {
  const classes = useStyle();

  const type = [{ type: "Perro" }, { type: "Gato" }, { type: "otro" }];

  const {
    control,    
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>          
            <Autocomplete
              options={type}
              inputValue={value}
              onInputChange={(event, value) => onChange(value)}
              getOptionLabel={(option) => option.type}
              style={{ width: 290 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}                 
                  variant="outlined"
                />
              )}
            />
          </>
        )}
        name={name}
        
      />
      {errors?.[name] && (
        <FormHelperText className={classes.errors}>
          {errors?.[name]?.message}
        </FormHelperText>
      )}
    </>
  );
};

export default ReusableSelect;
