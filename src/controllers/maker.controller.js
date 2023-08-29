import mongoose from 'mongoose';
import Maker from '../models/maker.model.js';
import { transformType } from '../utilities/transformType.js';

export const getMakers = async (req, res) => {
  try {
    const type = transformType(req.params.type);

    const makers = await Maker.find({ type }).populate('models');
    return res.json(makers);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getMaker = async (req, res) => {
  try {
    const id = req.params.id;
    const type = transformType(req.params.type);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const maker = await Maker.findById(req.params.id).populate('models');

    if (!maker || maker.type !== type) {
      return res.status(404).json({ message: 'Fabricante no encontrado' });
    }

    return res.json(maker);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
export const createMaker = async (req, res) => {
  try {
    const { name } = req.validData;
    const type = transformType(req.params.type);

    const existingMaker = await Maker.findOne({
      name,
      type,
    });

    if (existingMaker)
      return res.status(400).json({
        message: 'Ya existe un fabricante con ese nombre',
      });

    const newMaker = new Maker({
      name,
      type,
      //user: req.user.id,
    });
    const savedMaker = await newMaker.save();
    return res.json(savedMaker);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteMaker = async (req, res) => {
  try {
    const id = req.params.id;
    const type = transformType(req.params.type);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const maker = await Maker.findOneAndDelete({ _id: id, type });
    if (!maker)
      return res.status(404).json({ message: 'Fabricante no encontrado' });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
export const updateMaker = async (req, res) => {
  try {
    const { name } = req.validData;
    const id = req.params.id;
    const type = transformType(req.params.type);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const existingMaker = await Maker.findOne({
      name,
      type,
    });

    if (existingMaker)
      return res.status(400).json({
        message: 'Ya existe un fabricante con ese nombre',
      });

    const maker = await Maker.findOneAndUpdate(
      { _id: id, type },
      req.validData,
      {
        new: true,
      }
    );

    if (!maker)
      return res.status(404).json({ message: 'Fabricante no encontrado' });
    return res.json(maker);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
