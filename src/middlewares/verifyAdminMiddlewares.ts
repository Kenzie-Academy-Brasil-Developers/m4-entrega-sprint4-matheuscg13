import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken"

export const verifyAdminMiddleware = async (req, resp: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if(!token){
        throw new AppError("Invalid Token", 401)
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, (error: Error, decoded: any) => {
        if(error){
            throw new AppError(error.message, 404)
        }
        
        req.loggedUser = {
            id: decoded.sub,
            isAdm: decoded.isAdm
        }

        if(req.loggedUser.isAdm == false){
            throw new AppError("You are not admin", 403)
        }

        return next()
    })
}