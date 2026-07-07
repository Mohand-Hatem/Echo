import { IUserRepository } from "../domain/user.repository.interface.js";
import { User } from "../domain/user.entity.js";
import { UserModel } from "./user.schema.js";

const toDomain = (doc: any): User => ({
  id: doc._id.toString(),
  email: doc.email,
  password: doc.password,
  name: doc.name,
  role: doc.role,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

export const userRepository: IUserRepository = {
  async create(user) {
    const created = await UserModel.create(user);
    const domainUser = toDomain(created);
    delete domainUser.password;
    return domainUser;
  },

  async findById(id) {
    const doc = await UserModel.findById(id);
    return doc ? toDomain(doc) : null;
  },

  async findByEmail(email) {
    const doc = await UserModel.findOne({ email });
    return doc ? toDomain(doc) : null;
  },

  async update(id, user) {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true },
    );
    return updated ? toDomain(updated) : null;
  },

  async delete(id) {
    const result = await UserModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  },
};
