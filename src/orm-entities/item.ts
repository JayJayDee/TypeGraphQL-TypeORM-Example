import { PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { PlayerEntity } from './player';

enum ItemType {
  HEAL_POTION = 'HEAL_POTION',
  ANTI_PARALYSIS_POTION = 'ANTI_PARALYSIS_POTION',
  ANTI_POISON_POTION = 'ANTI_POISON_POTION',
  RESSURECTION_POTION = 'RESSURECTION_POTION',
  POKEBALL = 'POKEBALL'
}

enum ConsumeType {
  CONSUMABLE = 'CONSUMABLE',
  EQUIPMENT = 'EQUIPMENT'
}

export class ItemEntity {
  @PrimaryGeneratedColumn()
  public no: number;

  @Column({ length: 50, unique: true })
  public id: string;

  @Column({ length: 30 })
  public name: string;

  @Column({
    type: 'enum',
    enum: ItemType
  })
  public itemType: ItemType;

  @Column({
    type: 'enum',
    enum: ConsumeType
  })
  public consumeType: ConsumeType;

  @ManyToMany(type => PlayerEntity, player => player.items)
  @JoinTable({ name: 'player_has_item' })
  ownedBy: PlayerEntity[];
}