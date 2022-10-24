import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './product-image.entity';
@Entity({
    name: 'product' // Nombre de la tabla de la Base de datos
})
export class Product {
    @ApiProperty({ 
        example: '0921cc98-0b9d-4a84-8d89-0c4afc7a3157',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ 
        example: 'Shirt',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title: string;

    @ApiProperty({ 
        example: 0,
        description: 'Product price'
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({ 
        example: 'Almost new shirt, like new.',
        description: 'Product description',
        // default: null
    })
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @ApiProperty({ 
        example: 'men_turbine_long_sleeve_tee',
        description: 'Product slug for CEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    slug: string;

    @ApiProperty({ 
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({ 
        example: ['XS','S','M','L','XL','XXL','XXXL'],
        description: 'Product sizes'
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({ 
        example: ['men', 'women', 'kid', 'unisex'],
        description: 'gender'
    })
    @Column('text')
    gender: string;

    @ApiProperty({ 
        example: ['tag 1', 'tag 2'],
        description: 'gender'
    })
    @Column('text', {
        array: true,
        default: [],
    })
    tags: string[]

    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User;

    @BeforeInsert()
    checkSlugInsert(){
        function replaceAll(sentence, regx, replaceBy) {
            return sentence.replace(regx, replaceBy);
        }
        if(!this.slug){
            this.slug = this.title;
        }
        this.slug =  replaceAll(this.slug.toLowerCase(), ' ', '_')
        this.slug =  replaceAll(this.slug, "'", '');
        
        // .replaceAll(' ', '_').replaceAll("'", '')
    }
    @BeforeUpdate()
    checkSlugUpdate(){
        function replaceAll(sentence, regx, replaceBy) {
            return sentence.replace(regx, replaceBy);
        }
        if(!this.slug){
            this.slug = this.title;
        }
        this.slug =  replaceAll(this.slug.toLowerCase(), ' ', '_')
        this.slug =  replaceAll(this.slug, "'", '');
    }
}
