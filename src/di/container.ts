import { PokemonService } from "@/core/services/pokemon.service";
import { PokeApiAdapter } from "@/core/infrastructure/repositories/PokeApiPokemonRepository/adapter";
import { LocalStorageFavouriteAdapter } from "@/core/infrastructure/repositories/LocalStorageFavouriteRepository/adapter";

export const container = {
  pokemonService: new PokemonService(
    new PokeApiAdapter(),
    new LocalStorageFavouriteAdapter()
  ),
};
