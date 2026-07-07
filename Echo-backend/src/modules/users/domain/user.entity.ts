import { UserRole } from "./role.enum.js";

export interface User {
  id?: string;
  email: string;
  password?: string; // Stored as a hashed string; optional in returns for security
  name: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}
