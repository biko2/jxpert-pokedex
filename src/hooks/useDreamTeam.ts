import { useEffect, useState } from "react";
import { Pokemon } from "@/core/domain/models/Pokemon";
import { container } from "@/di/container";

const DREAM_TEAM_SIZE = 6;

export const useDreamTeam = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const getFavouritesData = async () => {
      setLoading(true);

      const fetchedPokemons = await container.pokemonService.getFavourites();

      setPokemons(fetchedPokemons.slice(-DREAM_TEAM_SIZE));
      setLoading(false);
    };
    getFavouritesData();
  }, []);

  return {
    team: pokemons,
  };
};
