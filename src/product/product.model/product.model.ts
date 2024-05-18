import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  oldPrice: number;

  @Column()
  credit: number;

  @Column()
  calculateRating: number;

  @Column()
  description: string;

  @Column('text', { array: true })
  advantages: string[];

  @Column('text', { array: true })
  disadvantages: string[];

  @Column('text', { array: true })
  categories: string[];

  @Column('text', { array: true })
  tags: string[];

  @Column('json')
  characteristics: {
    [key: string]: string;
  };

  @Column()
  createdAt: Date;
}
