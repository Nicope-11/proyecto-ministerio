import {
  Box,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledMenu } from './StyledMenu';
import { useContext, useEffect, useState } from 'react';
import { ColorModeContext, tokens } from '../theme';
import { NavLink, useLocation } from 'react-router-dom';
import { PrivateRoutes } from '../models/routes';

const routes = [
  {
    label: 'Inicio',
    route: '/',
  },
  {
    label: 'Computadoras',
    route: PrivateRoutes.COMPUTADORAS,
  },
  {
    label: 'Monitores',
    route: PrivateRoutes.MONITORES,
  },
  {
    label: 'Impresoras',
    route: PrivateRoutes.IMPRESORAS,
  },
  {
    label: 'Perifericos',
    route: PrivateRoutes.PERIFERICOS,
  },
  {
    label: 'Redes',
    route: PrivateRoutes.REDES,
  },
];

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [value, setValue] = useState(-1);

  const location = useLocation();
  useEffect(() => {
    const foundRoute = routes.find(
      (route) => route.route === location.pathname
    );
    if (foundRoute) {
      setValue(routes.indexOf(foundRoute));
    } else {
      setValue(0);
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  if (!isAuthenticated) return null;
  return (
    <>
      <Box
        //position="fixed"
        //width="100%"
        component="nav"
        p={1}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        bgcolor={colors.primary[800]}
      >
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography
            variant="h4"
            component="h2"
            marginLeft={1}
            fontWeight="700"
          >
            Inventario
          </Typography>
        </NavLink>
        <Box display="flex" marginRight={1}>
          <IconButton
            onClick={colorMode.toggleColorMode}
            sx={{ color: '#ffffff' }}
          >
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
          <IconButton
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{ color: '#ffffff' }}
          >
            <PersonOutlinedIcon />
          </IconButton>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon />
              Cerrar sesion
            </MenuItem>
          </StyledMenu>
        </Box>
      </Box>
      <Box
        //position="fixed"
        //width="100%"
        //top={55}
        bgcolor={colors.primary[700]}
        display={'flex'}
        gap={3}
        justifyContent={'center'}
      >
        <Tabs value={value} onChange={handleChange}>
          {routes.map((el, index) => (
            <Tab
              label={el.label}
              component={NavLink}
              to={el.route}
              key={index}
            />
          ))}
        </Tabs>
      </Box>
    </>
  );
};

export default Navbar;
