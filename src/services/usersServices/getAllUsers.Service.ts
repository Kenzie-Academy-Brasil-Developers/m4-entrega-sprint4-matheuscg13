import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { IUser } from "../../interfaces/users"
import { listUsersSchema } from "../../serializers/users.serializers"

export const getAllUsersService = async (): Promise<IUser[]> => {
    const usersRepository = AppDataSource.getRepository(Users)

    const listUsers = await usersRepository.find()

    const listUsersToBeReturned = await listUsersSchema.validate(listUsers, {
        stripUnknown: true,
        abortEarly: true
    })

    return listUsersToBeReturned
}