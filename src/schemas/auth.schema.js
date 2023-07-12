import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({ required_error: 'Campo requerido' }),
  email: z
    .string({ required_error: 'Campo requerido' })
    .email({ message: 'El email no es valido' }),
  password: z
    .string({ required_error: 'Campo requerido' })
    .min(8, { message: 'La contraseña debe tener almenos 8 caracteres' }),
});
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .email({ message: 'El email no es valido' }),
  password: z.string({ required_error: 'La contraseña es requerida' }),
});
