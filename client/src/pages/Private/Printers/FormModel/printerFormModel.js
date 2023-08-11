export default {
  formId: 'printerForm',
  formField: {
    nroInventario: {
      name: 'nroinventario',
      label: 'Nro Inventario*',
      requiredErrorMsg: 'Nro inventario es requerido',
    },
    nroSerie: {
      name: 'nroserie',
      label: 'Nro Serie*',
      requiredErrorMsg: 'Nro serie es requerido',
    },
    maker: {
      name: 'maker',
      label: 'Fabricante*',
      url: 'http://localhost:3000/api/impresoras/fabricantes',
      requiredErrorMsg: 'Fabricante es requerido',
    },
    model: {
      name: 'model',
      label: 'Modelo*',
      url: 'http://localhost:3000/api/impresoras/modelos/',
      requiredErrorMsg: 'Modelo es requerido',
    },
    place: {
      name: 'place',
      label: 'Lugar*',
      url: 'http://localhost:3000/api/lugares',
      requiredErrorMsg: 'Lugar es requerido',
    },
    state: {
      name: 'state',
      label: 'Estado*',
      url: 'http://localhost:3000/api/estados',
      requiredErrorMsg: 'Lugar es requerido',
    },
  },
};
