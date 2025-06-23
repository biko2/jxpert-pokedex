import { Region } from "@/core/domain/models/Region";
import { Pokemon } from "@/core/domain/models/Pokemon";
import { PokemonRepository } from "@/core/domain/ports/PokemonRepository";
import { FavouritePokemonRepository } from "@/core/domain/ports/FavouritePokemonRepository";

export class PokemonService {
  constructor(
    private repository: PokemonRepository,
    private favouriteRepository: FavouritePokemonRepository
  ) {}

  async getByRegion(region: Region): Promise<Pokemon[]> {
    return await this.repository.getByRegion(region);
  }

  async getFavourites(): Promise<Pokemon[]> {
    return await this.favouriteRepository.getFavourites();
  }

  async addFavourite(pokemon: Pokemon): Promise<void> {
    await this.favouriteRepository.addFavourite(pokemon);
  }

  async removeFavourite(pokemon: Pokemon): Promise<void> {
    await this.favouriteRepository.removeFavourite(pokemon);
  }
}
