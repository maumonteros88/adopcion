import * as yup from "yup";

const schema = yup.object().shape({
  creator: yup.string().required("Debe ingresar un creador").min(4,'Debe ingresar mas de 4 letras'),
  name: yup.string().required("Debe ingresar un nombre").min(4,'Debe ingresar mas de 4 letras'),
  rasgos: yup.string().required("Debe ingresar un rasgo").min(4,'Debe ingresar mas de 4 letras'),
  type: yup.string().required("Debe ingresar un tipo"),
});

export default schema;
