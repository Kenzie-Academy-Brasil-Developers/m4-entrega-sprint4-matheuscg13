import AppDataSource from "../../data-source"
import { Users } from "../../entities/user.entity"
import { AppError } from "../../errors"

export const deleteUserService = async (userId: string) => {
    const usersRepository = AppDataSource.getRepository(Users)

    const userToBeDeleted = await usersRepository.findOneBy({id: userId})

    if(userToBeDeleted.isActive == false){
        throw new AppError("This user not exist", 400)
        return null
    }

    if(!userToBeDeleted){
        throw new AppError("This user not exist", 400)
        return null
    }


    const newUser = await usersRepository.save({...userToBeDeleted, isActive: false})
    await usersRepository.softRemove(userToBeDeleted)

    
}