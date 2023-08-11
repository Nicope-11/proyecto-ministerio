import { Grid, Typography } from '@mui/material';
import { SelectMenuField } from '../../../../components/FormFields/SelectMenuField';

export default function AditionalForm(props) {
  const {
    formField: { place, state },
  } = props;
  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        sx={{ marginBottom: 3 }}
      >
        Informacion Adicional
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <SelectMenuField
            name={place.name}
            label={place.label}
            url={place.url}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectMenuField
            name={state.name}
            label={state.label}
            url={state.url}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}
