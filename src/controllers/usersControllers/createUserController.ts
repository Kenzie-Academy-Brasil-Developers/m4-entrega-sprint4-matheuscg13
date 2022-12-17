import { IUserRequest } from "../../interfaces/users"
import { createUserService } from "../../services/usersServices/createUser.service"
import { Request, Response } from "express"


export const createUserController = async (req: Request, resp: Response) => {
    const userData: IUserRequest = req.body
    const data = await createUserService(userData)
    return resp.status(201).json(data)
}
