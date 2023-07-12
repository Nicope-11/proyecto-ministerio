import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        component="h1"
        align="center"
        marginTop={10}
        fontWeight={700}
      >
        Pagina no encontrada :(
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
