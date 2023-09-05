import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../schemas/auth.schema';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { tokens } from '../theme';
import { useSnackbar } from 'notistack';

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loginErrors?.message) {
      enqueueSnackbar(loginErrors?.message, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
    }
  }, [loginErrors]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleSubmit = (data) => {
    signin(data);
  };

  console.log(loginErrors);

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated]);

  return (
    <>
      {/* <div className="surface-ground flex align-items-center justify-content-center min-h-screen ">
        <div className="surface-card p-6 pt-3 shadow-2 border-round-3xl w-10 md:w-8 lg:w-4">
          <div className="flex flex-column text-center m-4">
            <h1 className="m-0">Bienvenido!</h1>
            <small>ingrese para continuar</small>
          </div> */}
      {/* {loginErrors.map((error, i) => (
          <Message
            className="w-full mb-3"
            severity="error"
            text={error}
            key={i}
          />
        ))} */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor={colors.primary}
      >
        <Box
          minWidth={400}
          p={5}
          pt={5}
          boxShadow={2}
          borderRadius={5}
          bgcolor={colors.primary[700]}
          width={{ xs: '10', md: '8', lg: '4' }}
        >
          <Box textAlign="center" mb={4}>
            <Typography variant="h2" component="h1" fontWeight={700}>
              Bienvenido!
            </Typography>
            <Typography variant="h6" component="small">
              ingrese para continuar
            </Typography>
          </Box>
          {/*           {error && <Alert severity="error">{error}</Alert>} */}
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={loginSchema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ errors, touched }) => (
              <Form>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth error={!!errors.email}>
                    <Field
                      as={TextField}
                      id="email"
                      name="email"
                      variant="outlined"
                      type="text"
                      placeholder="Correo electronico"
                      error={!!errors.email && !!touched.email}
                    />
                    <ErrorMessage
                      sx={{
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      name="email"
                      component={() => (
                        <FormHelperText>{errors.email}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth error={!!errors.password}>
                    <Field
                      as={TextField}
                      name="password"
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      error={!!errors.password && !!touched.password}
                    />
                    <ErrorMessage
                      sx={{
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      name="password"
                      component={() => (
                        <FormHelperText>{errors.password}</FormHelperText>
                      )}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="neutral"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Iniciar Sesión
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
