import { Grid, Typography } from '@mui/material';
import { InputField } from '../../../../components/FormFields';
import { SelectMenuField } from '../../../../components/FormFields/SelectMenuField';

export default function TecnicalForm(props) {
  const {
    formField: { nroInventario, nroSerie, maker, model },
  } = props;
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        color="#000"
        mb="2rem"
      >
        Informacion Tecnica
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name={nroInventario.name}
            label={nroInventario.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectMenuField
            name={maker.name}
            label={maker.label}
            url={maker.url}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={nroSerie.name}
            label={nroSerie.label}
            sx={{ color: '#000' }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectMenuField
            name={model.name}
            label={model.label}
            url={model.url}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}

/* const CustomTextField = styled(TextField)`
  border: 1px solid blue;
  border-radius: 10px;
  transition: border-color 1s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    border-color: lightblue;
  }

  &:focus {
    border-color: blue;
    box-shadow: 0 0 5px lightblue;
  }
`; */

/* const CustomTextField3 = styled(TextField)(({ theme }) => ({
  'label + &': {
    //marginTop: theme.spacing(3),
  },
  '& label': {
    //color: '#dddddd',
    fontWeight: '500',
  },
  '& label.Mui-focused': {
    //color: '#dddddd',
    //fontWeight: '500',
  },
  '& .MuiInputBase-root': {
    //backgroundColor: '#040d19',
    //border: '1px solid #3b6f9c',
    //borderColor: theme.palette.mode === 'light' ? '#000000' : '#fbfdff'
    //transition: 'all 0.3s ease',
    borderRadius: '20px',
    backgroundColor: theme.palette.mode === 'dark' && '#040D19',
    borderColor: '#1b3c5e',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1b3c5e',
    //borderColor: mode === 'light' ? '#000' : '#ffffff',
    //transition: 'border-color 0.3s ease',
  },

  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      transition: 'all 0.2s linear',
      borderColor: '#3b6f9c',
    },
    '&:hover:not(.Mui-error) fieldset': {
      borderColor: '#97c4e5', // Cambio de color al pasar el mouse cuando no hay error
    },
    '&.Mui-focused:not(.Mui-error) fieldset': {
      borderColor: '#97c4e5',
      border: '1px solid #97c4e5',
      boxShadow: `rgba(147,197,253,0.3) 0px 0px 0px 2px`,
    },
  },
})); */
