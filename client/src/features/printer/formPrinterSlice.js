import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  nroinventario: '',
  nroserie: '',
  maker: '',
  model: '',
  place: '',
  state: '',
};

const formPrinterSlice = createSlice({
  name: 'formPrinter',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    resetField: (state, action) => {
      return initialState;
    },
    setIntialField: (state, action) => {
      const { id, nroinventario, nroserie, maker, model, place, stateOption } =
        action.payload;
      state.id = id;
      state.nroinventario = nroinventario;
      state.nroserie = nroserie;
      state.maker = maker;
      state.model = model;
      state.state = stateOption;
      state.place = place;
    },
  },
});

export const { updateField, resetField, setIntialField } =
  formPrinterSlice.actions;

export default formPrinterSlice.reducer;
