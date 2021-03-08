import { Response, Request } from 'express';
import connection from '../db/connection';
import User from '../models/User';
import bcrypt from 'bcryptjs';
export const getUsers = async (req: Request, res: Response) => {
  try {
    const results = await User.getUsers();
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't find any users",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const user = new User(email, hashPassword);

  try {
    await user.save();
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't Create new Post",
    });
  }
};
