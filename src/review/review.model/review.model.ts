import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ProductModel} from "../../product/product.model/product.model";

@Entity()
export class ReviewModel {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    author: string;

    @Column()
    rating: number;

    @Column()
    createdAt: Date;

    @ManyToOne(type => ProductModel)
    productId: ProductModel;
}
