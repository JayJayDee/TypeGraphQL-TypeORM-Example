import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('message')
export class MessageEntity {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true, length: 100 })
  public text?: string;

  @Column({ nullable: true, length: 100 })
  public imageUrl?: string;

  @Column({ nullable: true, length: 100 })
  public thumbUrl?: string;
}