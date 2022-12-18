import { Request, Response, NextFunction } from "express"
import { AnySchema } from 'yup'
import { AppError } from "../errors"


export const validateUpdateDataMiddleware = (schema: AnySchema) => async (req: Request, resp: Response, next: NextFunction) => {

    if('isAdm' in req.body || 'isActive' in req.body || 'id' in req.body){
        throw new AppError("Invalid field", 401)
    }
    
    try {
        const validatedData = await schema.validate(req.body, {
            stripUnknown: true,
            abortEarly: false
        })
        
        req.body = validatedData
         
        return next()
    } catch (error) {
        return resp.status(400).json({
            message: error.errors
        })
    }
}