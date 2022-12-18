import AppDataSource from "../../data-source";
import { Users } from "../../entities/user.entity";
import { AppError } from "../../errors";
import { IUserRequest, IUserUpdate } from "../../interfaces/users";
import { createUserResponseSchema } from "../../serializers/users.serializers";

export const updateUserService = async (userData: IUserUpdate, userId: string) => {
    const usersRepository = AppDataSource.getRepository(Users)

    const userToBeUpdated = await usersRepository.findOneBy({
        id: userId
    })

    if(!userToBeUpdated){
        throw new AppError("User not Found", 404)
    }

    const userUpdated = usersRepository.create({
        ...userToBeUpdated,
        ...userData
    })

    await usersRepository.save(userUpdated)

    const findUserToBeReturned = await usersRepository.findOneBy({
        id: userId
    })



    return findUserToBeReturned
}