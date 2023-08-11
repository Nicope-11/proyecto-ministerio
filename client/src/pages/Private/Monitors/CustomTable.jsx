import {
  DataGrid,
  GridPrintExportMenuItem,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridToolbarQuickFilter,
  useGridApiContext,
} from '@mui/x-data-grid';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const CustomTable = ({ data, header }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id', headerName: 'ID', headerAlign: 'center', align: 'center' },
    {
      field: 'lugar',
      headerName: 'Lugar',
      flex: 2,
      cellClassName: 'lugar-column--cell',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'cpucomputadora',
      headerName: 'CPU',
      headerAlign: 'center',
      align: 'center',
      flex: 2,
    },
    {
      field: 'ram',
      headerName: 'Cantidad de RAM',
      headerAlign: 'center',
      align: 'center',
      flex: 1,
    },
    {
      field: 'discohd',
      headerName: 'Disco HD',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'estado',
      headerName: 'Estado',
      headerAlign: 'center',
      align: 'center',
      /*       renderCell: ({ row: { estado } }) => {
        return (
          <Box
            width="50%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              estado == 'Activa' ? colors.greenAccent[600] : colors.grey[700]
            }
            borderRadius="5px"
          >
            {estado === 'Activa' && <DoneOutlinedIcon />}
            {estado === 'Inactiva' && <BlockOutlinedIcon />}
            {estado === 'Reparacion' && <BuildOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
              {estado}
            </Typography>
          </Box>
        );
      }, */
    },
    /* {
      field: 'acciones',
      headerName: 'Acciones',
      headerAlign: 'center',
      align: 'center',
      flex: 1.2,
      renderCell: ({ row: { id } }) => {
        return (
          <Box display="flex" gap="5px">
            <IconButton
              variant="contained"
              onClick={() => {
                setOpenEditForm(true);
                setIdToEdit(id);
              }}
            >
              <BorderColorOutlinedIcon />
            </IconButton>
            <IconButton
              color="error"
              variant="contained"
              onClick={() => {
                setConfirmDelete(true);
                setIdToDelete(id);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    }, */
  ];

  return (
    <Box
      height="100%"
      width="100%"
      sx={{
        '& .MuiDataGrid-root': {
          border: 'none',
        },
        '& .MuiDataGrid-cell': {
          //borderBottom: 'none',
        },
        '& .lugar-column--cell': {
          //color: colors.greenAccent[500],
        },
        '& .MuiDataGrid-columnHeaders': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[900],
          borderBottom: 'none',
          //borderRadius: '15px',
          borderTopLeftRadius: '15px',
          borderTopRightRadius: '15px',
        },
        '& .MuiDataGrid-virtualScroller': {
          //backgroundColor: colors.primary[500],
          backgroundColor: colors.bgTable,
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: colors.bgTable,
          marginBottom: '10px',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          //marginBottom: 1,
        },
        '& .MuiCheckbox-root': {
          //color: `${colors.greenAccent[200]} !important`,
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          //color: `${colors.grey[400]} !important`,
        },
        '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
          outline: 'none !important',
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={data}
        density="compact"
        rowSelection={false}
        components={{ Toolbar: CustomGridToolbar }}
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
          '@media print': {
            '.MuiDataGrid-main': {
              width: 'fit-content',
              fontSize: '12px',
              height: 'fit-content',
              overflow: 'visible',
              color: '#000',
            },
            //marginBottom: 400,
          },
        }}
      />
    </Box>
  );
};
export default CustomTable;

const CustomGridToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingLeft: 3,
        paddingRight: 3,
      }}
    >
      <Box
        padding={1.2}
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
          <Button variant="contained" color="neutral" size="small">
            Agregar
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <GridToolbarQuickFilter variant="outlined" size="small" sx={{ p: 0 }} />
        <ExportPrintButton />
        {/* <GridToolbarExport
          printOptions={{
            hideFooter: true,
            hideToolbar: true,
          }}
        /> */}
      </Box>
    </GridToolbarContainer>
  );
};

/* const GridToolbarExport = ({ printOptions, ...other }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <GridToolbarExportContainer
      {...other}
      sx={{
        padding: 0.6,
        backgroundColor: colors.greenAccent[500],
        '&:hover': {
          backgroundColor: colors.greenAccent[600], // Cambia el color de fondo al hacer hover
        },
      }}
    >
      <GridPrintExportMenuItem options={printOptions} />
    </GridToolbarExportContainer>

  );
}; */

{
  /* <Button {...other} variant="contained" color="success">
      Exportar
      <GridPrintExportMenuItem options={printOptions} />
    </Button> */
}

const ExportPrintButton = () => {
  const apiRef = useGridApiContext();

  const handleClick = () => {
    apiRef.current.exportDataAsPrint({ hideFooter: true, hideToolbar: true });
  };

  return (
    <Button onClick={handleClick} variant="contained" color="success">
      Exportar
    </Button>
  );
};
