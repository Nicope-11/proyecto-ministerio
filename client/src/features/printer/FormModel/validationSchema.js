import * as Yup from 'yup';
import printerFormModel from './printerFormModel';
const {
  formField: { nroInventario, nroSerie, maker, model, place, state },
} = printerFormModel;

export default [
  Yup.object().shape({
    [nroInventario.name]: Yup.string()
      .required(`${nroInventario.requiredErrorMsg}`)
      .matches(/^[A-Z]{3}-\d{2,}$/, 'Formato invalido, Ej: IMP-10'),
    [nroSerie.name]: Yup.string().required(`${nroSerie.requiredErrorMsg}`),
    [maker.name]: Yup.string().required(`${maker.requiredErrorMsg}`),
    [model.name]: Yup.string().required(`${maker.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [place.name]: Yup.string().required(`${place.requiredErrorMsg}`),
    [state.name]: Yup.string().required(`${place.requiredErrorMsg}`),
  }),
];
