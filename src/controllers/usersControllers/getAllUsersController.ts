import { Request, Response } from "express";
import { getAllUsersService } from "../../services/usersServices/getAllUsers.Service";

export const getAllUsersController = async (req: Request, resp: Response) => {
    const data = await getAllUsersService()
    resp.status(200).json(data)
}