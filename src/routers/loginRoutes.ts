import { Router } from "express";
import { loginController } from "../controllers/loginControllers/loginControler";
import { validateDataMiddleware } from "../middlewares/validateData.middleware";
import { loginSchema } from "../serializers/login.serializer";

export const loginRoutes = Router()

loginRoutes.use("", validateDataMiddleware(loginSchema), loginController)