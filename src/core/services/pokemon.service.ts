import { Region } from "@/core/domain/models/Region";
import { Pokemon } from "@/core/domain/models/Pokemon";
import { PokeApiAdapter } from "@/core/infrastructure/repositories/PokeApiPokemonRepository/adapter";

const getByRegion = async (region: Region): Promise<Pokemon[]> => {
  const repository = new PokeApiAdapter();

  return await repository.getByRegion(region);
};

export const pokemonService = {
  getByRegion,
};
