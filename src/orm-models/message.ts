import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('message')
export class MessageModel {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true, length: 100 })
  public text?: string;

  @Column({ nullable: true, length: 100 })
  public imageUrl?: string;

  @Column({ nullable: true, length: 100 })
  public thumbUrl?: string;

  @CreateDateColumn()
  public publishDate: Date;
}