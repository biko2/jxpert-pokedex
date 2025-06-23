import { Region } from "@/core/domain/models/Region";
import { Pokemon } from "@/core/domain/models/Pokemon";
import { PokeApiAdapter } from "@/core/infrastructure/repositories/PokeApiPokemonRepository/adapter";
import { PokemonRepository } from "@/core/domain/ports/PokemonRepository";

const getByRegion = async (region: Region): Promise<Pokemon[]> => {
  const repository = new PokeApiAdapter();

  return await repository.getByRegion(region);
};

export const pokemonService = {
  getByRegion,
};

export class PokemonService {
  constructor(private repository: PokemonRepository) {}

  async getByRegion(region: Region): Promise<Pokemon[]> {
    return await this.repository.getByRegion(region);
  }
}
