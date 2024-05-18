import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;
}
