import { Pokemon } from "@/core/domain/models/Pokemon";
import { Region } from "@/core/domain/models/Region";
import { PokemonRepository } from "@/core/domain/ports/PokemonRepository";
import { PokemonDTO, PokemonListDTO } from "./dto";
import { REGION_RANGES } from "./constants";
import { mapToPokemon } from "./mapper";

export class PokeApiAdapter implements PokemonRepository {
  async getByRegion(region: Region): Promise<Pokemon[]> {
    const { results }: PokemonListDTO = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${REGION_RANGES[region].start}&limit=${REGION_RANGES[region].end}`
    ).then((res) => res.json());
    return Promise.all(
      results.map(async ({ url }) => {
        const pokemonData: PokemonDTO = await fetch(url).then((res) =>
          res.json()
        );

        return mapToPokemon(pokemonData);
      })
    );
  }
}
