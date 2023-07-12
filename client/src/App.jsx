import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CssBaseline, ThemeProvider } from '@mui/material';

//import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/Private/ProfilePage';
import HomePage from './pages/Private/HomePage';
import ComputerPage from './pages/Private/Computer/ComputerPage.jsx';
import MonitorPage from './pages/Private/MonitorPage';
import PrinterPage from './pages/Private/PrinterPage';
import PeripheralPage from './pages/Private/PeripheralPage';
import NetworkPage from './pages/Private/NetWorkPage';
import NotFoundPage from './pages/NotFoundPage';

import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import Navbar from './components/Navbar';
import { ColorModeContext, useMode } from './theme';
import { PrivateRoutes, PublicRoutes } from './models/routes.js';
import AuthGuard from './guards/auth.guard.jsx';
import Private from './pages/Private/Private.jsx';
import { Suspense } from 'react';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <TaskProvider>
            <Suspense fallback={<>Cargando</>}>
              <BrowserRouter>
                <Navbar />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  {/* <Route path="/register" element={<RegisterPage />} /> */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route
                      path={PrivateRoutes.COMPUTADORAS}
                      element={<ComputerPage />}
                    />
                    <Route path="/monitores" element={<MonitorPage />} />
                    <Route path="/impresoras" element={<PrinterPage />} />
                    <Route path="/perifericos" element={<PeripheralPage />} />
                    <Route path="/redes" element={<NetworkPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
                {/* <Routes>
                  <Route path={PublicRoutes.LOGIN} element={<LoginPage />} />
                  <Route element={<AuthGuard privateValidation={true} />}>
                    <Route path={`/*`} element={<Private />} />
                  </Route>
                  <Route path="*" element={<NotFoundPage />} />
                </Routes> */}
              </BrowserRouter>
            </Suspense>
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
