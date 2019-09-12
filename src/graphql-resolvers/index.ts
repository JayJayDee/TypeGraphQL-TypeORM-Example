export const AllResolvers = () => {
  // for lazy-load with typeDI.
  const { PokemonResolver } = require('./pokemon-resolver');
  const { PlayerResolver } = require('./player-resolver');

  return [
    PokemonResolver,
    PlayerResolver
  ];
};