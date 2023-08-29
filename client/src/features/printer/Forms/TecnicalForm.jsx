import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOptionsQuery } from '../../../app/api/optionsApiSlice';
import { updateField } from '../formPrinterSlice';
import { InputField } from '../../../components/FormFields';
import SelectWithMenu from '../../../components/FormFields/SelectWithMenu';

export default function TecnicalForm(props) {
  const {
    formField: { nroInventario, nroSerie, maker, model },
  } = props;

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formPrinter);

  const { data: optionsMakers, error: errorMakers } = useGetOptionsQuery(
    '/impresoras/fabricantes'
  );
  const { data: optionsModels, error: errorModels } = useGetOptionsQuery(
    `/impresoras/modelos/${formData.maker}`
  );

  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value }));
  };

  return (
    <>
      <Typography variant="h5" gutterBottom align="center" mb="2rem">
        Informacion Tecnica
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            name={nroInventario.name}
            label={nroInventario.label}
            value={formData.nroinventario}
            onChange={(e) =>
              handleInputChange(nroInventario.name, e.target.value)
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={nroSerie.name}
            label={nroSerie.label}
            value={formData.nroserie}
            onChange={(e) => handleInputChange(nroSerie.name, e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectWithMenu
            name={maker.name}
            label={maker.label}
            value={formData.maker}
            options={optionsMakers}
            url={maker.url}
            onChange={(e) => {
              handleInputChange(maker.name, e.target.value);
              dispatch(updateField({ field: model.name, value: '' }));
            }}
            valuesForm={{ name: formData.maker }}
            setField={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectWithMenu
            name="model"
            label="modelo"
            options={formData.maker ? optionsModels : []}
            value={formData.model}
            onChange={(e) => {
              handleInputChange('model', e.target.value);
            }}
            disabled={!formData.maker}
            url={'/impresoras/modelos'}
            valuesForm={{ name: formData.model, maker: formData.maker }}
            setField={handleInputChange}
          />
        </Grid>
      </Grid>
    </>
  );
}
