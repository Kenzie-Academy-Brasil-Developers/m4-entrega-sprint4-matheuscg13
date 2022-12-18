import { Request, Response } from "express";
import { IUserUpdate } from "../../interfaces/users";
import { updateUserService } from "../../services/usersServices/updateUser.service";

export const updateUserController = async (req: Request, resp: Response) => {
    const userData: IUserUpdate = req.body
    const data = await updateUserService(userData, req.params.id)
    return resp.status(200).json(data)
}