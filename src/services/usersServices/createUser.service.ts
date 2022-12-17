import { getRepository } from "typeorm"
import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors"
import { IUser, IUserRequest } from "../../interfaces/users"
import { createUserResponseSchema } from "../../serializers/users.serializers"

export const createUserService = async (userData: IUserRequest): Promise<IUser> => {
    const usersRepository = AppDataSource.getRepository(Users)

    const verifyUserExists = await usersRepository.findOneBy({
        email: userData.email
    })

    if(verifyUserExists){
        throw new AppError("This user already exists", 400)
    }

    const newUser = usersRepository.create(userData)
    await usersRepository.save(newUser)

    const userToBeReturned = await createUserResponseSchema.validate(newUser, {
        stripUnknown: true
    })

    return userToBeReturned
}