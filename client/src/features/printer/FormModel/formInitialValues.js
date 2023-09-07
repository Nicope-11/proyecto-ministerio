import printerFormModel from './printerFormModel';
const {
  formField: { nroInventario, nroSerie, maker, model, place, state },
} = printerFormModel;

export default {
  [nroInventario.name]: '',
  [nroSerie.name]: '',
  [maker.name]: '',
  [model.name]: '',
  [place.name]: '',
  [state.name]: '',
};
