import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es obligatorio'),
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Ingrese un correo electrónico válido')
    .test('email', 'Ingrese un correo electrónico válido', (value) => {
      if (value) {
        // Expresión regular para verificar el formato del correo electrónico
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value);
      }
      return false;
    }),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Ingrese un correo electrónico válido')
    .test('email', 'Ingrese un correo electrónico válido', (value) => {
      if (value) {
        // Expresión regular para verificar el formato del correo electrónico
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(value);
      }
      return false;
    }),
  password: yup.string().required('La contraseña es obligatoria'),
});
