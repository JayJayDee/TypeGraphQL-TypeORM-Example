import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { PlayerEntity } from './player';

enum PokemonType {
  NORMAL = 'NORMAL',
  FLYING = 'FLYING',
  FIGHTING = 'FIGHTING',
  ELECTRIC = 'ELECTRIC',
  FIRE = 'FIRE',
  WATER = 'WATER',
  ROCK = 'ROCK',
  GRASS = 'GRASS'
}

@Entity('pokemon')
export class PokemonEntity {

  @PrimaryGeneratedColumn()
  public no: number;

  @Column({ length: 80, unique: true })
  public id: string;

  @Column({ length: 30 })
  public name: string;

  @Column()
  public level: number;

  @Column({
    type: 'enum',
    enum: PokemonType
  })
  public type: PokemonType;

  @ManyToMany(type => PlayerEntity, player => player.pokemons)
  @JoinTable({ name: 'player_has_pokemon' })
  ownedBy: PlayerEntity[];
}