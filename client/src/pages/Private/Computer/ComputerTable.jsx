import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

const ComputerTable = ({ data, apiRef }) => {
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
          borderRadius: '15px',
        },
        '& .MuiDataGrid-virtualScroller': {
          //backgroundColor: colors.primary[500],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
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
        apiRef={apiRef}
        columns={columns}
        rows={data}
        density="compact"
        rowSelection={false}
        sx={{
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
export default ComputerTable;
