import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({ type: 'varchar', length: 45})
    name: string

    @Column({ type: 'varchar', length:45, unique:true})
    email: string

    @Column({ type: 'boolean', default:false})
    admin: boolean

    @Column({ type:'varchar', length: 120})
    password: string
    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){

        const isEncrypted: number = getRounds(this.password)

        if(!isEncrypted){
            this.password = hashSync(this.password, 10)
        }
    }

    @CreateDateColumn()
    createdAt?: string | Date

    @UpdateDateColumn()
    updatedAt?: string | Date
    
    @DeleteDateColumn({ nullable: true})
    deletedAt?: string | Date | null | undefined
}

export default User