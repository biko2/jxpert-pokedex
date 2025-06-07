import { useEffect, useState } from "react";
import { Pokemon, PokemonList, Region, SortItem, Stat } from "../types/types";
import { pokemonService } from "../core/services/pokemon.service";

const statMap: Record<Stat, string> = {
  healthPoints: "hp",
  attack: "attack",
  defense: "defense",
  specialAttack: "special-attack",
  specialDefense: "special-defense",
  speed: "speed",
};

const sortByStat = (stat: Stat, pokemons: Pokemon[]) => {
  return [...pokemons].sort((a, b) => {
    const aStat =
      a.stats.find((s) => s.stat.name === statMap[stat])?.base_stat ?? 0;
    const bStat =
      b.stats.find((s) => s.stat.name === statMap[stat])?.base_stat ?? 0;
    return bStat - aStat;
  });
};

class SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return [...pokemons].sort((a, b) => a.id - b.id);
  }
}
class HealthPointsSortStrategy extends SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return sortByStat("healthPoints", pokemons);
  }
}

class AttackSortStrategy extends SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return sortByStat("attack", pokemons);
  }
}

class DefenseSortStrategy extends SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return sortByStat("defense", pokemons);
  }
}

class SpecialAttackSortStrategy extends SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return sortByStat("specialAttack", pokemons);
  }
}

class SpecialDefenseSortStrategy extends SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return sortByStat("specialDefense", pokemons);
  }
}

class SpeedSortStrategy extends SortStrategy {
  public sort(pokemons: Pokemon[]): Pokemon[] {
    return sortByStat("speed", pokemons);
  }
}

const sortStrategies: Record<SortItem, typeof SortStrategy> = {
  default: SortStrategy,
  healthPoints: HealthPointsSortStrategy,
  attack: AttackSortStrategy,
  defense: DefenseSortStrategy,
  specialAttack: SpecialAttackSortStrategy,
  specialDefense: SpecialDefenseSortStrategy,
  speed: SpeedSortStrategy,
};

export const usePokemons = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [filtering, setFiltering] = useState<boolean>(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [processedPokemons, setProcessedPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [region, setRegion] = useState<Region>("kanto");
  const [sortBy, setSortBy] = useState<SortItem>("default");

  useEffect(() => {
    const getPokemonsData = async () => {
      setLoading(true);
      setFiltering(true);

      const fetchedPokemons = await pokemonService.getByRegion(region);

      setPokemons(fetchedPokemons);
      setProcessedPokemons(fetchedPokemons);
      setLoading(false);
    };
    getPokemonsData();
  }, [region]);

  useEffect(() => {
    const hasNameOrType = ({ name, types }: Pokemon) =>
      name.includes(searchTerm.toLowerCase()) ||
      types.some((type) => type.type.name.startsWith(searchTerm.toLowerCase()));

    setProcessedPokemons(pokemons.filter(hasNameOrType));
    setFiltering(false);
  }, [pokemons[0]?.id, searchTerm]);

  useEffect(() => {
    const sortStrategy = new sortStrategies[sortBy]();

    const sortedPokemons = sortStrategy.sort(processedPokemons);

    setProcessedPokemons(sortedPokemons);
  }, [processedPokemons[0]?.id, sortBy]);

  return {
    region,
    searchTerm,
    sortBy,
    loading,
    filtering,
    pokemons: processedPokemons,
    onSearchChange: setSearchTerm,
    onRegionChange: setRegion,
    onSortChange: setSortBy,
  };
};
