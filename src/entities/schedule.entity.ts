import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'date'})
    date: Date | string

    @Column({type: 'time'})
    hour: string 
}

export default Schedule