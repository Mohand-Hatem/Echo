import { z } from "zod";
import { UserRole } from "../domain/role.enum.js";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .trim(),
    email: z
      .string("Email is required")
      .email("Please provide a valid email address")
      .trim()
      .lowercase(),
    password: z
      .string("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    role: z.nativeEnum(UserRole, "Invalid user role").optional(),
  }),
});
