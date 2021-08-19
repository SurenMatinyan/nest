import { Product } from "src/product/Entity/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    login: string

    @Column()
    password: string

    @OneToMany(() => Product, product => product.user, {onDelete: 'CASCADE'})
    product: Product[]
}