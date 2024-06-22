import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

export class Advantages {
  @Column()
  title: string;

  @Column()
  description: string;
}

export class hh {
  @Column()
  count: number;

  @Column()
  juniorSalary: number;

  @Column()
  middleSalary: number;

  @Column()
  seniorSalary: number;
}

@Entity()
export class TopPageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  firstCategory: TopLevelCategory;

  @Column()
  secondCategory: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column('json')
  hh?: hh;

  @Column('json')
  advantages: Advantages[];

  @Column()
  seoText: string;

  @Column()
  tagsTitle: string;

  @Column('text', { array: true })
  tags: string[];
}
