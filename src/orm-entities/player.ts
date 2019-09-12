import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';
import { PokemonEntity } from './pokemon';

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

  @ManyToMany(type => PokemonEntity, pokemon => pokemon.ownedBy)
  pokemons: PokemonEntity[];
}