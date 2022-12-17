import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AppError } from "../errors"

export const verifyPermissionsMiddleware = async (req, resp: Response, next: NextFunction) => {
    let token = req.headers.authorization

    if(!token){
        throw new AppError("Invalid Token", 401)
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY, (error: Error, decoded: any) => {
        if(error){
            throw new AppError(error.message, 401)
        }
        
        req.loggedUser = {
            id: decoded.sub,
            isAdm: decoded.isAdm
        }

        if(req.loggedUser.isAdm == false && req.loggedUser.id != req.params.id){
            throw new AppError("You dont have permission")
        }

        return next()
    })
}