import { Router } from "express";
import { createUserController } from "../controllers/usersControllers/createUserController";
import { deleteUserController } from "../controllers/usersControllers/deleteUsersController";
import { getAllUsersController } from "../controllers/usersControllers/getAllUsersController";
import { updateUserController } from "../controllers/usersControllers/updateUserController";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { verifyAdminMiddleware } from "../middlewares/verifyAdminMiddlewares";
import { verifyPermissionsMiddleware } from "../middlewares/verifyPemissions";
import { createUserRequestSchema, updateUserRequestSchema } from "../serializers/users.serializers";
import { validateUpdateDataMiddleware } from "../middlewares/validateUpdateData";

export const usersRoutes = Router()

usersRoutes.post('',validateDataMiddleware(createUserRequestSchema), createUserController)
usersRoutes.get("", verifyAdminMiddleware, getAllUsersController)
usersRoutes.delete("/:id", verifyAdminMiddleware, deleteUserController)
usersRoutes.patch("/:id", validateUpdateDataMiddleware(updateUserRequestSchema), verifyPermissionsMiddleware, updateUserController)