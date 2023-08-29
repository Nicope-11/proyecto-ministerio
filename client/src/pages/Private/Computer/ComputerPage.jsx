import {
  Box,
  Button,
  Typography,
  useTheme,
  InputBase,
  IconButton,
  debounce,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { tokens } from '../../../theme';
import ComputerTable from './ComputerTable';
import { useMemo, useState } from 'react';
import { mockDataComputer } from './DataComputer';

import { useGridApiRef } from '@mui/x-data-grid';

const ComputerPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // API GRID

  const apiRef = useGridApiRef();
  const [searchText, setSearchText] = useState('');

  const updateSearchValue = useMemo(() => {
    return debounce((newValue) => {
      apiRef.current.setQuickFilterValues(
        newValue.split(' ').filter((word) => word !== '')
      );
    }, 250);
  }, [apiRef]);

  function handleSearchValueChange(event) {
    const newValue = event.target.value;
    setSearchText(newValue);
    updateSearchValue(newValue);
  }

  const handleExport = () => {
    apiRef.current.exportDataAsPrint({ hideFooter: true, hideToolbar: true });
  };

  // Modal

  return (
    <>
      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={5}
        borderRadius={3}
        padding="5px"
        height="76vh"
        display="flex"
        flexDirection="column"
      >
        <Box
          padding={1.2}
          paddingLeft={4}
          paddingRight={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
          flex={1}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h3" fontWeight="600">
              Computadoras
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="neutral"
              onClick={() => handleOpenDialog()}
            >
              Agregar
            </Button>
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              height="35px"
              color="#fff"
              border="solid 1px #fff"
              borderRadius={1}
            >
              <InputBase
                sx={{ ml: 2, flex: 1, color: '#fff' }}
                placeholder="Buscar"
                value={searchText}
                onChange={handleSearchValueChange}
              />
              <IconButton type="button" sx={{ p: 1, color: '#fff' }}>
                <SearchIcon />
              </IconButton>
            </Box>
            <Button variant="contained" color="success" onClick={handleExport}>
              Exportar
            </Button>
          </Box>
        </Box>
        <Box
          bgcolor={colors.bgTable}
          borderRadius={3}
          padding={1.5}
          paddingTop={2}
          paddingBottom={0}
          height="62vh"
          flex={15}
        >
          <ComputerTable data={mockDataComputer} apiRef={apiRef} />
        </Box>
      </Box>
    </>
  );
};

export default ComputerPage;
