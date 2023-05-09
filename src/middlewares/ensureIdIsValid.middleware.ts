import { NextFunction, Request, Response } from "express"
import { Repository } from "typeorm"
import { User } from "../entities"
import { AppDataSource } from "../data-source"
import { AppError } from "../error"



const ensureIdIsValidMiddleware = async (req:Request, res:Response, next: NextFunction):Promise<Response | void > => {
    const id:number = Number(req.params.id)

    const userRepository:Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOne({
        where:{
            id: id
        }
    })

    if(!user){
        throw new AppError('User not found', 404)
    }

    return next()
}

export { ensureIdIsValidMiddleware }