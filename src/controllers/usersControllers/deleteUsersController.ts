import { Request, Response } from "express";
import { deleteUserService } from "../../services/usersServices/deleteUser.service";

export const deleteUserController = async (req: Request, resp: Response) => {
    const data = await deleteUserService(req.params.id)
    return resp.status(204).json(data)
}