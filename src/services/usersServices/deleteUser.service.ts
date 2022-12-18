import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors"

export const deleteUserService = async (userId: string) => {
    const usersRepository = AppDataSource.getRepository(Users)

    const userToBeDeleted = await usersRepository.findOneBy({id: userId})
    if(!userToBeDeleted){
        throw new AppError("This user not exist", 404)
    }
    
    await usersRepository.softRemove(userToBeDeleted)
    const userToBeReturned = await usersRepository.save({...userToBeDeleted, isActive: false})
    
    return userToBeReturned
}