import {
  Box,
  Button,
  Typography,
  useTheme,
  InputBase,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { tokens } from '../../../theme';
import ComputerTable from './ComputerTable';
import { useState } from 'react';
import { mockDataComputer } from './DataComputer';
import CustomDialog, {
  dialogOpenSubject$,
} from '../../../components/CustomDialog';

const ComputerPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Barra de busqueda

  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState(mockDataComputer);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchText(searchValue);

    const searchRegex = new RegExp(`.*${searchValue}.*`, 'ig');
    const filteredRows = mockDataComputer.filter((o) => {
      return Object.values(o).some((value) => {
        return searchRegex.test(value.toString());
      });
    });
    setTableData(filteredRows);
  };

  // Modal

  const handleOpenDialog = () => {
    dialogOpenSubject$.setSubject('dialog1');
  };

  return (
    <>
      <CustomDialog onClose="dialog1">
        <h2>hola</h2>
      </CustomDialog>

      <Box
        bgcolor={colors.primary[700]}
        margin={1}
        marginTop={5}
        borderRadius={7}
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
              borderRadius={2}
            >
              <InputBase
                sx={{ ml: 2, flex: 1, color: '#fff' }}
                placeholder="Buscar"
                value={searchText}
                onChange={handleSearch}
              />
              <IconButton type="button" sx={{ p: 1, color: '#fff' }}>
                <SearchIcon />
              </IconButton>
            </Box>
            <Button variant="contained" color="success">
              Exportar
            </Button>
          </Box>
        </Box>
        <Box
          bgcolor={colors.bgTable}
          borderRadius={7}
          padding={1.5}
          paddingTop={2}
          paddingBottom={0}
          height="62vh"
          flex={15}
        >
          <ComputerTable data={tableData} />
        </Box>
      </Box>
    </>
  );
};

export default ComputerPage;
