import { Pokemon } from "@/core/domain/models/Pokemon";
import { PokemonDTO, StatDTO, TypeDTO } from "./dto";
import { Type } from "@/core/domain/models/type";
import { Stat } from "@/core/domain/models/Stat";

const mapStat: Record<StatDTO, Stat> = {
  hp: "healthPoints",
  attack: "attack",
  defense: "defense",
  "special-attack": "specialAttack",
  "special-defense": "specialDefense",
  speed: "speed",
};

const mapType: Record<TypeDTO, Type> = {
  bug: "bug",
  dark: "dark",
  dragon: "dragon",
  electric: "electric",
  fairy: "fairy",
  fighting: "fighting",
  fire: "fire",
  flying: "flying",
  ghost: "ghost",
  grass: "grass",
  ground: "ground",
  ice: "ice",
  normal: "normal",
  poison: "poison",
  psychic: "psychic",
  rock: "rock",
  steel: "steel",
  water: "water",
};

export const mapToPokemon = (pokemon: PokemonDTO): Pokemon => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map((type) => mapType[type.type.name]),
    stats: pokemon.stats.map((stat) => ({
      name: mapStat[stat.stat.name],
      value: stat.base_stat,
    })),
    image: pokemon.sprites.other["official-artwork"].front_default,
  };
};
