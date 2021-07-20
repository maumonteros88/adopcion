import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useStyle from "../../Form/style";

const ReusableForm = ({ children, schema, onSubmit }) => {
  const classes = useStyle();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset({creator:"",name:"", rasgos:"",type:""});
      console.log('se envio el formulario');
    }
  }, [methods.formState.isSubmitSuccessful]);
  return (
    <FormProvider {...methods}>
      <form
        className={`${classes.root} ${classes.form}`}
        autoComplete="off"
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        >
        {children}
      </form>
    </FormProvider>
  );
};

export default ReusableForm;
