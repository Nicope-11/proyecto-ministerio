import Model from '../models/model.model.js';
import Maker from '../models/maker.model.js';
import { transformType } from '../utilities/transformType.js';
import mongoose from 'mongoose';

export const getModels = async (req, res) => {
  try {
    const type = transformType(req.params.type);

    const models = await Model.find({ type });
    return res.json(models);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getModel = async (req, res) => {
  try {
    const id = req.params.id;
    const type = transformType(req.params.type);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const model = await Model.findById(id);

    if (!model || model.type !== type) {
      return res.status(404).json({ message: 'Fabricante no encontrado' });
    }

    return res.json(model);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
export const getModelByMaker = async (req, res) => {
  try {
    const maker = req.params.maker;
    const type = transformType(req.params.type);

    const models = await Model.find({ maker });

    const foundModel = models.find((model) => model.type === type);

    if (!foundModel) {
      return res.status(404).json({ message: 'Modelos no encontrado' });
    }

    return res.json(models);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
export const createModel = async (req, res) => {
  try {
    const { name, maker } = req.validData;
    const type = transformType(req.params.type);

    const modelFound = await Model.findOne({ name });
    if (modelFound)
      return res.status(400).json({
        message: 'Ya existe un modelo con el mismo nombre',
      });

    const makerExist = await Maker.findById(maker);
    if (!makerExist) {
      return res
        .status(400)
        .json({ message: 'No existe el fabricante ingresado' });
    }

    if (makerExist.type !== type) {
      return res.status(400).json({
        message: `No se puede agregar un modelo de tipo ${type} a un fabricante de tipo ${makerExist.type}`,
      });
    }

    const newModel = new Model({
      name,
      type,
      maker: makerExist._id,
      //user: req.user.id,
    });

    const savedModel = await newModel.save();

    makerExist.models.addToSet(savedModel._id);
    await makerExist.save();

    return res.json(savedModel);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const id = req.params.id;
    const type = transformType(req.params.type);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const model = await Model.findOneAndDelete({ _id: id, type });
    if (!model)
      return res.status(404).json({ message: 'Modelo no encontrado' });

    const maker = await Maker.findById(model.maker);
    if (maker) {
      maker.models.pull(model._id);
      await maker.save();
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
export const updateModel = async (req, res) => {
  try {
    const { name } = req.validData;
    const id = req.params.id;
    const type = transformType(req.params.type);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de fabricante inválido' });
    }

    const modelFound = await Model.findOne({ name });
    if (modelFound)
      return res.status(400).json({
        message: 'Ya existe un modelo con el mismo nombre',
      });

    const model = await Model.findOneAndUpdate(
      { _id: id, type },
      req.validData,
      {
        new: true,
      }
    );

    if (!model)
      return res.status(404).json({ message: 'Modelo no encontrado' });
    return res.json(model);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
