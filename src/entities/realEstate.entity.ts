import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Address from "./address.entity";
import Category from "./category.entity";
import Schedule from "./schedule.entity";

@Entity('real_estate')
class RealEstate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'boolean', nullable:true})
    sold?: boolean | null | undefined

    @Column({type: 'decimal', precision:12, scale:2, default:0, nullable:true})
    value?: string | number | null | undefined

    @Column({type: 'integer'})
    size: number

    @CreateDateColumn()
    createdAt?: string | Date

    @UpdateDateColumn()
    updatedAt?: string | Date

    @OneToOne(() => Address, (address) => address.realEstate)
    @JoinColumn()
    address: Address

    @ManyToOne(() => Category)
    category: Category

    @OneToMany(() => Schedule, (schedule)=>schedule.realEstate)
    schedule: Schedule[]


}

export default RealEstate