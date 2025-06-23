import { Pokemon } from "@/core/domain/models/Pokemon";
import { Region } from "@/core/domain/models/Region";

export interface FavouritePokemonRepository {
  getFavourites(): Promise<Pokemon[]>;
  addFavourite(pokemon: Pokemon): Promise<void>;
  removeFavourite(pokemon: Pokemon): Promise<void>;
}
