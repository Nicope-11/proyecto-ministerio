import { Box, Button, Typography, debounce, useTheme } from '@mui/material';

import { tokens } from '../../../theme';
import CustomTable from './CustomTable';
import { useGridApiRef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';
import StyledSearchInput from '../../../components/StyledSearchInput';
import ButtonMoreMenu from './Components/ButtonMoreMenu';
import FormPage from './FormPage';
import { useGetPrintersQuery } from '../../../api/printersApiSlice';

const PrinterPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: printers, isError, isLoading } = useGetPrintersQuery();

  const columns = [
    {
      field: 'nroinventario',
      headerName: 'Nro Inv.',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'nroserie',
      headerName: 'Nro Serie',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'place',
      headerName: 'Lugar',
      flex: 3,
      cellClassName: 'lugar-column--cell',
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => params.row.place.name,
    },
    {
      field: 'maker',
      headerName: 'Fabricante',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      valueGetter: (params) => params.row.maker.name,
    },
    {
      field: 'model',
      headerName: 'Modelo',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
      valueGetter: (params) => params.row.model.name,
    },
    {
      field: 'state',
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'estado-column--cell',
      minWidth: 100,
      flex: 1,
      renderCell: ({ row: { state } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
            minWidth="85px"
            padding="1px"
            borderRadius={25}
            backgroundColor={
              state.name == 'Activo'
                ? colors.greenAccent[600]
                : colors.grey[700]
            }
          >
            {state.name}
          </Box>
        );
      },
      valueGetter: (params) => params.row.state.name,
    },
    {
      field: 'acciones',
      headerName: '',
      sortable: false,
      disableExport: true,
      disableColumnMenu: true,
      align: 'center',
      width: 40,
      renderCell: ({ row: { id, nroinventario } }) => {
        return <ButtonMoreMenu id={id} name={nroinventario} />;
      },
    },
  ];
  const apiRef = useGridApiRef();
  const [searchText, setSearchText] = useState('');
  const [openForm, setOpenForm] = useState(false);

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
    // SIRVE PARA NO EXPORTAR ACCIONES
    /* const columnFieldsToExclude = ['acciones'];
    const filteredColumns = columns.filter(
      (column) => !columnFieldsToExclude.includes(column.field)
    );
    const columnNames = filteredColumns.map((column) => column.field);
 */
    apiRef.current.exportDataAsPrint({
      hideFooter: true,
      hideToolbar: true,
    });
  };

  return (
    <>
      <FormPage
        title="Agregar impresora"
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
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
              Impresoras
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => setOpenForm(true)}
            >
              Agregar
            </Button>
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <StyledSearchInput
              searchText={searchText}
              onSearchTextChange={handleSearchValueChange}
            />
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
          <CustomTable
            data={printers || []}
            header={columns}
            apiRef={apiRef}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </>
  );
};

export default PrinterPage;
