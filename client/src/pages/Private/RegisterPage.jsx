import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../schemas/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => signup(values));

  return (
    <div className="surface-ground flex align-items-center justify-content-center min-h-screen ">
      <div className="surface-card p-5 shadow-2 border-round w-10 md:w-8 lg:w-5">
        <form onSubmit={onSubmit}>
          <div className="flex flex-column gap-2 mb-3">
            <label htmlFor="username" className="block text-900 font-medium">
              Usuario
            </label>
            <InputText
              id="username"
              type="text"
              {...register('username', { required: true })}
              placeholder="Usuario"
              className={
                'w-full ' + classNames({ 'p-invalid': errors.username })
              }
            />
            {errors.username && (
              <small className="p-error">{errors.username.message}</small>
            )}
          </div>
          <div className="flex flex-column gap-2 mb-3">
            <label htmlFor="email" className="block text-900 font-medium ">
              Email
            </label>
            <InputText
              id="email"
              type="text"
              {...register('email', { required: true })}
              placeholder="Correo electronico"
              className={'w-full ' + classNames({ 'p-invalid': errors.email })}
            />
            {errors.email && (
              <small className="p-error">{errors.email.message}</small>
            )}
            {registerErrors.map((error, i) => (
              <small className="p-error" key={i}>
                {error}
              </small>
            ))}
          </div>

          <div className="flex flex-column gap-2 mb-3">
            <label htmlFor="password" className="block text-900 font-medium">
              Contraseña
            </label>
            <InputText
              id="password"
              type="password"
              {...register('password', { required: true })}
              placeholder="Contraseña"
              className={
                'w-full ' + classNames({ 'p-invalid': errors.password })
              }
            />
            {errors.password && (
              <small className="p-error">{errors.password.message}</small>
            )}
          </div>

          <Button
            type="submit"
            label="Registrarse"
            icon="pi pi-user"
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
