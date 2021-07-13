import * as yup from "yup";

const schema = yup.object().shape({
  creator: yup.string().required("Debe ingresar un creador"),
  message: yup.string().required("Debe ingresar un mensaje"),
  title: yup.string().required("Debe ingresar un titulo"),
  tags: yup.string().required("Debe ingresar un tags"),
});

export default schema;
