import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('real_estate')
class RealEstate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'boolean', nullable:true})
    sold: boolean | null | undefined

    @Column({type: 'decimal', precision:12, scale:2, default:0, nullable:true})
    value: string | number

    @Column({type: 'integer'})
    size: number

    @CreateDateColumn()
    createdAt?: string | Date

    @UpdateDateColumn()
    updatedAt?: string | Date


}

export default RealEstate