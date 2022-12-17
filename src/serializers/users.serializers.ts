import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUser, IUserRequest, IUserUpdate } from '../interfaces/users'


export const createUserRequestSchema:SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required()
})

export const createUserResponseSchema:SchemaOf<IUser> = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
    isAdm: yup.boolean().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    isActive: yup.boolean().required()
})

export const listUsersSchema = yup.array(createUserResponseSchema)

export const updateUserRequestSchema:SchemaOf<IUserUpdate> = yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
})