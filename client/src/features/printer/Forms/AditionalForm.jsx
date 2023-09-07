import { Grid, Typography } from '@mui/material';
import SelectWithMenu from '../../../components/FormFields/SelectWithMenu';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../formPrinterSlice';
import { useGetOptionsQuery } from '../../../app/api/optionsApiSlice';

export default function AditionalForm(props) {
  const {
    formField: { place, state },
  } = props;

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formPrinter);

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  const { data: optionsPlaces, error: errorPlaces } = useGetOptionsQuery(
    `${place.url}`
  );
  const { data: optionsStates, error: errorStates } = useGetOptionsQuery(
    `${state.url}`
  );

  return (
    <>
      {
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Informacion Adicional
        </Typography>
      }
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectWithMenu
            name={place.name}
            label={place.label}
            url={place.url}
            options={optionsPlaces}
            value={formData.place}
            onChange={(e) => {
              handleInputChange(place.name, e.target.value);
            }}
            valuesForm={{ name: formData.place }}
            setField={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectWithMenu
            name={state.name}
            label={state.label}
            url={state.url}
            options={optionsStates}
            value={formData.state}
            onChange={(e) => {
              handleInputChange(state.name, e.target.value);
            }}
            valuesForm={{ name: formData.state }}
            setField={handleInputChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
