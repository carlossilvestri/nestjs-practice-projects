import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './';
@Entity({
    name: 'product_image' // Nombre de la tabla de la Base de datos
})
export class ProductImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    url: string

    @ManyToOne(
        () => Product,
        (product) => product.images,
        { onDelete: 'CASCADE'}
    )
    product: Product
}
