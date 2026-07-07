import { usersService } from "../application/users.service.js";
import { Request, Response } from "express";

export const usersController = {
  async createUser(req: Request, res: Response): Promise<void> {
    const user = await usersService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await usersService.getUserById(id as string);
    res.status(200).json({
      success: true,
      data: user,
    });
  },
};
