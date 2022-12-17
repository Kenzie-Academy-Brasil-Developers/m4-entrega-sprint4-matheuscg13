import { Request, Response, NextFunction } from "express"
import { AnySchema } from 'yup'


export const validateDataMiddleware = (schema: AnySchema) => async (req: Request, resp: Response, next: NextFunction) => {

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