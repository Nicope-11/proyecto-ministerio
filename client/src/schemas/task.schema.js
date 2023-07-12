import * as yup from 'yup';

export const createTaskSchema = yup.object().shape({
  title: yup.string().required('El titulo es obligatorio'),
  description: yup.string().required('La descripcion es obligatoria'),
});
