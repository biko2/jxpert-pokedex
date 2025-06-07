import { Pokemon, PokemonList, Region } from "../../types/types";

const REGION_RANGES: Record<Region, { start: number; end: number }> = {
  kanto: { start: 0, end: 151 },
  johto: { start: 151, end: 100 },
  hoenn: { start: 251, end: 135 },
  sinnoh: { start: 386, end: 108 },
  unova: { start: 494, end: 155 },
  kalos: { start: 649, end: 72 },
  alola: { start: 721, end: 88 },
  galar: { start: 809, end: 96 },
  paldea: { start: 905, end: 120 },
};

const getByRegion = async (region: Region): Promise<Pokemon[]> => {
  const { results }: PokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${REGION_RANGES[region].start}&limit=${REGION_RANGES[region].end}`
  ).then((res) => res.json());
  return Promise.all(
    results.map(async ({ url }) => await fetch(url).then((res) => res.json()))
  );
};

export const pokemonService = {
  getByRegion,
};
