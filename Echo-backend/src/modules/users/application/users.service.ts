import bcrypt from "bcrypt";
import { userRepository } from "../infrastructure/user.repository.js";
import { User } from "../domain/user.entity.js";
import {
  ConflictError,
  NotFoundError,
} from "../../../shared/errors/app-error.js";

export const usersService = {
  async createUser(
    data: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password || "", saltRounds);
    const newUser = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  },

  async getUserById(id: string): Promise<User> {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new NotFoundError("User");
    }
    return user;
  },
};
