import Printer from '../models/printer.model.js';
import Place from '../models/place.model.js';
import State from '../models/state.model.js';
import Maker from '../models/maker.model.js';
import Model from '../models/model.model.js';
import mongoose from 'mongoose';

export const getPrinters = async (req, res) => {
  try {
    const printers = await Printer.find().populate(
      'maker model place state',
      'name'
    );
    return res.json(printers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getPrinter = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const printer = await Printer.findById(id).populate(
      'maker model place state'
    );
    if (!printer)
      return res.status(404).json({ message: 'Impresora no encontrada' });
    return res.json(printer);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

export const createPrinter = async (req, res) => {
  try {
    const { nroinventario, nroserie, maker, model, place, state } =
      req.validData;

    const validMaker = await Maker.exists({ _id: maker, type: 'impresora' });
    if (!validMaker) {
      return res
        .status(400)
        .json({ message: 'No existe el fabricante ingresado' });
    }

    const validModel = await Model.exists({ _id: model, type: 'impresora' });
    if (!validModel) {
      return res.status(400).json({ message: 'No existe el modelo ingresado' });
    }

    const validState = await State.exists({ _id: state });
    if (!validState) {
      return res.status(400).json({ message: 'No existe el estado ingresado' });
    }

    const validLugar = await Place.exists({ _id: place });
    if (!validLugar) {
      return res.status(400).json({ message: 'No existe el lugar ingresado' });
    }

    const printerFound = await Printer.findOne({ nroinventario });
    if (printerFound)
      return res
        .status(400)
        .json({ message: 'El nroinventario ya esta en uso' });

    const newPrinter = new Printer({
      nroinventario,
      nroserie,
      maker,
      model,
      place,
      state,
      //user: req.user.id,
    });
    const savedPrinter = await newPrinter.save();
    return res.json(savedPrinter);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deletePrinter = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const printer = await Printer.findByIdAndDelete(id);

    if (!printer)
      return res.status(404).json({ message: 'Impresora no encontrada' });

    return res
      .sendStatus(204)
      .json({ message: 'Impresora eliminada exitosamente!' });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
export const updatePrinter = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const { nroinventario, nroserie, maker, model, place, state } =
      req.validData;

    const validMaker = await Maker.exists({ _id: maker, type: 'impresora' });
    if (!validMaker) {
      return res
        .status(400)
        .json({ message: 'No existe el fabricante ingresado' });
    }

    const validModel = await Model.exists({ _id: model, type: 'impresora' });
    if (!validModel) {
      return res.status(400).json({ message: 'No existe el modelo ingresado' });
    }

    const validState = await State.exists({ _id: state });
    if (!validState) {
      return res.status(400).json({ message: 'No existe el estado ingresado' });
    }

    const validLugar = await Place.exists({ _id: place });
    if (!validLugar) {
      return res.status(400).json({ message: 'No existe el lugar ingresado' });
    }

    const printerFound = await Printer.findOne({
      nroinventario,
      _id: { $ne: id },
    });
    if (printerFound)
      return res
        .status(400)
        .json({ message: 'El nroinventario ya esta en uso' });

    const printer = await Printer.findByIdAndUpdate(
      id,
      {
        nroinventario,
        nroserie,
        maker,
        model,
        place,
        state,
      },
      {
        new: true,
      }
    );

    if (!printer)
      return res.status(404).json({ message: 'Impresora no encontrada' });
    return res.json(printer);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
