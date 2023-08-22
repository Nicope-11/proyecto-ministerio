import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password, username } = req.validData;

  try {
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json(['El correo electronico ya esta en uso']);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccesToken({ id: userSaved.id });
    res.cookie('token', token, {
      secure: true,
      sameSite: 'none',
    });
    res.json(userSaved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.validData;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res
        .status(400)
        .json({ message: 'Los datos ingresados son incorrectos' });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res
        .status(400)
        .json({ message: 'Los datos ingresados son incorrectos' });

    const token = await createAccesToken({ id: userFound.id });
    res.cookie('token', token, {
      secure: true,
      sameSite: 'none',
    });
    res.json(userFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });

  return res.sendStatus(200);
};
export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: 'usuario no encontrado' });

  return res.json(userFound);
  //return res.send('Profile');
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'No autorizado' });

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'No autorizado' });

    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: 'No autorizado' });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
