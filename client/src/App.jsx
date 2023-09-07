import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CssBaseline, ThemeProvider } from '@mui/material';

//import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/Private/ProfilePage';
import HomePage from './pages/Private/HomePage';
import ComputerPage from './pages/Private/Computer/ComputerPage.jsx';
import MonitorPage from './pages/Private//Monitors/MonitorPage.jsx';
import PeripheralPage from './pages/Private/PeripheralPage';
import NetworkPage from './pages/Private/NetWorkPage';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import { ColorModeContext, tokens, useMode } from './theme';
import { PrivateRoutes, PublicRoutes } from './models/routes.js';
import { Suspense } from 'react';
import { ConfirmProvider } from 'material-ui-confirm';
import { ModalProvider } from './context/ModalContext.jsx';
import Prefetch from './features/Auth/Prefetch.jsx';
import PagePrinter from './features/printer/PagePrinter.jsx';
import FormPrinter from './features/printer/FormPrinter.jsx';

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <ConfirmProvider
            defaultOptions={{
              title: `Estas seguro?`,
              confirmationText: 'Aceptar',
              cancellationText: 'Cancelar',
              dialogProps: {
                className: '',
                PaperProps: {
                  sx: {
                    width: '400px',
                    borderRadius: '8px',
                    padding: '10px',
                  },
                },
              },
              titleProps: {
                fontSize: '22px',
                fontWeight: 'bold',
                marginBottom: '5px',
              },
              confirmationButtonProps: {
                color: 'success',
                variant: 'contained',
              },
              cancellationButtonProps: {
                color: 'error',
              },
            }}
          >
            <ModalProvider>
              <Suspense fallback={<>Cargando</>}>
                <Navbar />
                <Routes location={background || location}>
                  <Route path="/login" element={<LoginPage />} />
                  {/* <Route path="/register" element={<RegisterPage />} /> */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path={PrivateRoutes.COMPUTADORAS}
                      element={<ComputerPage />}
                    />
                    <Route path="/monitores" element={<MonitorPage />} />
                    <Route path="/impresoras" element={<PagePrinter />}>
                      <Route path="agregar" element={<FormPrinter />} />
                      <Route path="editar/:id" element={<FormPrinter />} />
                    </Route>
                    <Route path="/perifericos" element={<PeripheralPage />} />
                    <Route path="/redes" element={<NetworkPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
                {background && (
                  <Routes>
                    <Route
                      path="impresoras/agregar"
                      element={<FormPrinter />}
                    />
                    <Route
                      path="impresoras/editar/:id"
                      element={<FormPrinter />}
                    />
                  </Routes>
                )}
                {/* <Routes>
                  <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
                  <Route element={<AuthGuard privateValidation={true} />}>
                  <Route path={`/*`} element={<Private />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes> */}
              </Suspense>
            </ModalProvider>
          </ConfirmProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
