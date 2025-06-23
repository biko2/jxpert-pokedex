import { Pokemon } from "@/core/domain/models/Pokemon";
import { PokemonDTO } from "./dto";
import { Type } from "@/core/domain/models/type";
import { Stat } from "@/core/domain/models/Stat";

export const mapToPokemon = (pokemon: PokemonDTO): Pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((type) => type.type.name as Type),
    stats: pokemon.stats.map((stat) => ({
      name: stat.stat.name as Stat,
      value: stat.base_stat,
    })),
    image: pokemon.sprites.other["official-artwork"].front_default,
  };
};
