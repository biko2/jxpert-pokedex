import { useEffect, useState } from "react";
import { Pokemon } from "@/core/domain/models/Pokemon";
import { container } from "@/di/container";

export const useFavourites = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getFavouritesData = async () => {
      setLoading(true);

      const fetchedPokemons = await container.pokemonService.getFavourites();

      setPokemons(fetchedPokemons);
      setLoading(false);
    };
    getFavouritesData();
  }, []);

  const favouriteToggle = async (pokemon: Pokemon, isChecked: boolean) => {
    const isFavourite = pokemons.find((pkmn) => pkmn.id === pokemon.id);

    if (isChecked && !isFavourite) {
      await container.pokemonService.addFavourite(pokemon);
      setPokemons((prev) => [...prev, pokemon]);
      return;
    }
    if (!isChecked && isFavourite) {
      await container.pokemonService.removeFavourite(pokemon);
      setPokemons((prev) => prev.filter((pkmn) => pkmn.id !== pokemon.id));
    }
  };

  return {
    favourites: pokemons,
    onFavouriteToggle: favouriteToggle,
  };
};
