import 'express-async-errors'
import "reflect-metadata"
import express from "express"
import { handleError } from "./errors"
import { usersRoutes } from './routers/userRoutes'
import { loginRoutes } from './routers/loginRoutes'



const app = express()
app.use(express.json())
app.use("/users", usersRoutes)
app.use("/login", loginRoutes)
app.use(handleError)

export default app