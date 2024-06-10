import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  user.username = username;
  user.password = password;
  await user.hashPassword();
  await userRepository.save(user);
  res.sendStatus(201);
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { username } });

  if (user && (await user.checkPassword(password))) {
    (req.session as any).userId = user.id;
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
};

export const logout = (req: Request, res: Response) => {
  delete (req.session as any).userId;
  req.session.destroy((err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
};

export const me = async (req: Request, res: Response) => {
  const userId = (req.session as any).userId;
  if (!userId) {
    return res.sendStatus(401);
  }

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};
