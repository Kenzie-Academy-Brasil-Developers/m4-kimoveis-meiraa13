import { Repository } from "typeorm";
import { TScheduleData, TScheduleRequest } from "../../interfaces/schedules.interfaces";
import { RealEstate, Schedule, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";


const createScheduleService = async(requestData:TScheduleData, userId:number, realEstateId:number) =>{
    const userRepository:Repository<User> = AppDataSource.getRepository(User)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)

    const dateString = requestData.date
    const separatedDate = dateString.split('/')
    const year = Number(separatedDate[0])
    const month = Number(separatedDate[1])
    const day = Number(separatedDate[2])

   const realEstate : RealEstate | null = await realEstateRepository.findOne({
    where:{
        id: realEstateId
    }
   })

   if(!realEstate){
        throw new AppError('RealEstate not found', 404)
   }

   const user : User | null = await userRepository.findOne({
    where:{
        id:userId
    }
   })

   const hour = Number(requestData.hour.slice(0,2))
   const minute = Number(requestData.hour.slice(3,5))
   if(hour<8 || hour>18){
     throw new AppError('Invalid hour, available times are 8AM to 18PM', 400)
   }
  
   const userBooked: Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
   .leftJoinAndSelect('schedule.user', 'user')
   .where('schedule.date = :date', {date: new Date(year, day, month)})
   .where('schedule.hour = :hour', {hour: requestData.hour})
   .where('schedule.user =:id', {id: userId})
   .getOne()

   if(userBooked){
          throw new AppError('User schedule to this real estate at this date and time already exists', 409)
   }

   const scheduleBooked : Schedule | null = await scheduleRepository.createQueryBuilder('schedule')
   .leftJoinAndSelect('schedule.realEstate', 'realEstate')
   .where('schedule.date = :date', {date:new Date(year, day, month)})
   .where('schedule.hour = :hour', {hour:requestData.hour})
   .where('schedule.realEstate = :id', {id: realEstateId})
   .getOne()

   if(scheduleBooked){
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
   }

   

   const newSchedule: Schedule = scheduleRepository.create({
        hour: requestData.hour,
        date: new Date(year, day, month),
        realEstate: realEstate,
        user: user!
   })

   await scheduleRepository.save(newSchedule)

   return newSchedule
}


export { createScheduleService }