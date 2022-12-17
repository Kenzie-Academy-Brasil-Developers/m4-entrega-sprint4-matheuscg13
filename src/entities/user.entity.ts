import { hashSync } from "bcryptjs";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
class Users {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({default: 'true'})
    isActive: boolean

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @BeforeUpdate()
    @BeforeInsert()
    hashPassword(){
        this.password = hashSync(this.password, 10) 
    }

    @Column()
    isAdm: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
    
}

export { Users };