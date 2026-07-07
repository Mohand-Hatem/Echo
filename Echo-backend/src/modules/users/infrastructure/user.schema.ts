import { Schema, model } from "mongoose";
import { User } from "../domain/user.entity.js";
import { UserRole } from "../domain/role.enum.js";

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Excluded from query results by default
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.MEMBER,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<User>("User", UserSchema);
