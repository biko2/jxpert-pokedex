import { Pokemon } from "@/core/domain/models/Pokemon";
import { FavouritePokemonRepository } from "@/core/domain/ports/FavouritePokemonRepository";

const FAVOURITES_KEY = "favouritePokemons";

export class LocalStorageFavouriteAdapter
  implements FavouritePokemonRepository
{
  async getFavourites(): Promise<Pokemon[]> {
    const favourites = localStorage.getItem(FAVOURITES_KEY);

    if (!favourites) {
      return [];
    }

    try {
      const parsedFavourites: Pokemon[] = JSON.parse(favourites);
      return parsedFavourites;
    } catch (error) {
      return [];
    }
  }

  async addFavourite(pokemon: Pokemon): Promise<void> {
    const favourites = await this.getFavourites();

    const isFavourite = favourites.some((pkmn) => pkmn.id === pokemon.id);

    if (isFavourite) {
      return;
    }

    favourites.push(pokemon);
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }

  async removeFavourite(pokemon: Pokemon): Promise<void> {
    const favourites = await this.getFavourites();

    const updatedFavourites = favourites.filter(
      (pkmn) => pkmn.id !== pokemon.id
    );

    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updatedFavourites));
  }
}
