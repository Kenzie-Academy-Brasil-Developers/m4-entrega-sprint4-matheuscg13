import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const loginService = async (userData: IUserLogin): Promise<object> =>  {

    const usersRepository = AppDataSource.getRepository(Users)

    const user = await usersRepository.findOneBy({
        email: userData.email
    })

    if(!user){
        throw new AppError("Email or password invalid", 403)
    }

    const passwordVerification = await compare(userData.password, user.password)

    if(!passwordVerification){
        throw new AppError("Email or password invalid", 403)
    }

    const token = jwt.sign(
        {
            isAdm: user.isAdm
        },
        process.env.SECRET_KEY,
        {
            subject: String(user.id),
            expiresIn: "24h"
        }
    )
        
    return {
        token: token
    }
}