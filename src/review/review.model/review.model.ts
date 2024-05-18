import { ProductModel } from '../../product/product.model/product.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReviewModel {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => ProductModel, (product) => product.id)
  @JoinColumn({ name: 'productId' })
  product: ProductModel;
}
