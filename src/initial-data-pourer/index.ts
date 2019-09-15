import { Container } from 'typedi';
import * as uuid from 'uuid/v4';
import { LoggerToken } from '../loggers';
import { ConnectionToken } from '../orm-initiator';
import { PlayerEntity, PokemonEntity, ItemEntity } from '../orm-entities';

const tag = '[initial-data-pourer]';

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

// pours initial data to database.
export const pourInitialData = async () => {
  const log = Container.get(LoggerToken);

  if (await isDataExists() === true) {
    log.info(`${tag} data exists.. ignored.`);
    return;
  }

  const connection = Container.get(ConnectionToken);

  await connection
    .createQueryBuilder()
    .insert()
    .into(PokemonEntity)
    .values(initialPokemons())
    .execute();

  await connection
    .createQueryBuilder()
    .insert()
    .into(PlayerEntity)
    .values(initialPlayers())
    .execute();

  await connection
    .createQueryBuilder()
    .insert()
    .into(ItemEntity)
    .values(initialItems())
    .execute();

  const playerRepo = connection.getRepository(PlayerEntity);
  const pokemonRepo = connection.getRepository(PokemonEntity);
  const itemRepo = connection.getRepository(ItemEntity);

  const player = await playerRepo.findOne({ name: 'Jaydee' });
  if (player) {
    const pokemons = [
      ... await pokemonRepo.find({ name: 'Pikachu' }),
      ... await pokemonRepo.find({ name: 'Salamander' })
    ];
    const items = [
      ... await itemRepo.find({ name: 'Oreng Fruit' })
    ];

    player.pokemons = pokemons;
    player.items = items;
    await playerRepo.save(player);
  }

  const player2 = await playerRepo.findOne({ name: 'Yongsuli '});
  if (player2) {
    const pokemons = [
      ... await pokemonRepo.find({ name: 'Rattata' }),
      ... await pokemonRepo.find({ name: 'Pidgey' })
    ];
    const items = [
      ... await itemRepo.find({ name: 'Oreng Fruit' }),
      ... await itemRepo.find({ name: 'Potion' })
    ];

    player2.pokemons = pokemons;
    player2.items = items;
    await playerRepo.save(player2);
  }

  log.info(`${tag} initial data poured to the database.`);
};

// returns is data exists
const isDataExists = async () => {
  const connection = Container.get(ConnectionToken);
  const dataSize = await connection.getRepository(PlayerEntity).count();
  if (dataSize === 0) return false;
  return true;
};

const initialPlayers = () => ([
  {
    id: uuid(),
    name: 'Jaydee',
    fund: 12000
  },
  {
    id: uuid(),
    name: 'Seoul',
    fund: 8000
  },
  {
    id: uuid(),
    name: 'Yongsuli',
    fund: 6000
  }
]);

const initialPokemons = () => ([
  {
    id: uuid(),
    name: 'Pikachu',
    level: 12,
    type: PokemonType.ELECTRIC
  },
  {
    id: uuid(),
    name: 'Salamander',
    level: 19,
    type: PokemonType.FIGHTING
  },
  {
    id: uuid(),
    name: 'Bulbarsar',
    level: 17,
    type: PokemonType.GRASS
  },
  {
    id: uuid(),
    name: 'Machop',
    level: 12,
    type: PokemonType.FIGHTING
  },
  {
    id: uuid(),
    name: 'Rattata',
    level: 15,
    type: PokemonType.NORMAL
  },
  {
    id: uuid(),
    name: 'Pidgey',
    level: 12,
    type: PokemonType.FLYING
  }
]);

const initialItems = () => ([
  {
    id: uuid(),
    name: 'Potion',
    itemType: ItemType.HEAL_POTION,
    ConsumeType: ConsumeType.CONSUMABLE
  },
  {
    id: uuid(),
    name: 'Super Ball',
    itemType: ItemType.POKEBALL,
    ConsumeType: ConsumeType.CONSUMABLE
  },
  {
    id: uuid(),
    name: 'Oreng Fruit',
    itemType: ItemType.HEAL_POTION,
    ConsumeType: ConsumeType.EQUIPMENT
  },
  {
    id: uuid(),
    name: 'Hyper Ball',
    itemType: ItemType.POKEBALL,
    ConsumeType: ConsumeType.CONSUMABLE
  }
]);