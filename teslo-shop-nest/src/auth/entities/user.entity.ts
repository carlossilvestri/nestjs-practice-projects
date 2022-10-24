import { Product } from "../../product/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false, // Esto evita que en las peticiones se seleccione y envie el hash del password.
    })
    password: string;

    @Column('text')
    fullName: string;

    @Column('bool', {
        default: true
    })
    isActive: boolean;

    @Column('text', {
        array: true,
        default: ['user'],
    })
    roles: string[];

    @OneToMany(
        () => Product,
        (product) => product.user
    )
    product: Product;

    @BeforeInsert()
    checkFieldsBeforeInsert(){
        this.checkEmail();
    }
    checkEmail(){
        this.email = this.email.toLocaleLowerCase().trim();
    }
    @BeforeUpdate()
    checkFieldsBeforeUpdate(){
        this.checkEmail();
    }
}
