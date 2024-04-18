import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

@Entity()
export class TopPageModel {

    @PrimaryGeneratedColumn()
    id: string;

    @Column('text')
    firstLCategory: TopLevelCategory;

    @Column()
    secondCategory: string;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column('json')
    hh?: {
        count: number;
        juniorSalary: number;
        middleSalary: number;
        seniorSalary: number;
    };

    @Column('json')
    advantages: {
        title: string;
        description: string;
    }[];

    @Column()
    seoText: string;

    @Column()
    tagsTitle: string;

    @Column('text',{array: true})
    tags: string[];

}
