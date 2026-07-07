import { Router } from "express";
import { usersController } from "./users.controller.js";
import { validateRequest } from "../../../shared/middlewares/validate.middleware.js";
import { createUserSchema } from "./user.validation.js";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserSchema),
  usersController.createUser,
);
router.get("/:id", usersController.getUserById);

export { router as usersRouter };
