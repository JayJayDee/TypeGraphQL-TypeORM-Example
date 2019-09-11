import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('player')
export class PlayerEntity {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column({ length: 30, unique: true })
  public id: string;

  @Column({ length: 30 })
  public name: string;

  @Column()
  public fund: number;
}