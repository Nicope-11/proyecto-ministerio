import State from '../models/state.model.js';

export const getStates = async (req, res) => {
  try {
    const places = await State.find();
    return res.json(places);
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' });
  }
};
export const getState = async (req, res) => {
  try {
    const state = await State.findById(req.params.id);
    if (!state)
      return res.status(404).json({ message: 'Estado no encontrado' });
    return res.json(state);
  } catch (error) {
    return res.status(404).json({ message: 'Estado no encontrado' });
  }
};
export const createState = async (req, res) => {
  try {
    const { name, color } = req.validData;
    const newState = new State({
      name,
      color,
      //user: req.user.id,
    });
    const savedState = await newState.save();
    return res.json(savedState);
  } catch (error) {
    return res.status(500).json({ message: 'Algo salio mal' });
  }
};
export const deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state)
      return res.status(404).json({ message: 'Estado no encontrado' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: 'Estado no encontrado' });
  }
};
export const updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.validData, {
      new: true,
    });

    if (!state)
      return res.status(404).json({ message: 'Estado no encontrado' });
    return res.json(state);
  } catch (error) {
    return res.status(404).json({ message: 'Estado no encontrado' });
  }
};
