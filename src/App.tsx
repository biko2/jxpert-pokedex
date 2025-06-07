import { useEffect, useState } from "react";
import { Region, SortItem, PokemonList, Pokemon, Stat } from "./types/types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PokemonCard } from "./components/PokemonCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { Filters } from "./components/Filters";

const REGION_RANGES: Record<Region, { start: number; end: number }> = {
  kanto: { start: 0, end: 151 },
  johto: { start: 151, end: 100 },
  hoenn: { start: 251, end: 135 },
  sinnoh: { start: 386, end: 108 },
  unova: { start: 494, end: 155 },
  kalos: { start: 649, end: 72 },
  alola: { start: 721, end: 88 },
  galar: { start: 809, end: 96 },
  paldea: { start: 905, end: 120 },
};

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

const getPokemons = async (region: Region): Promise<Pokemon[]> => {
  const { results }: PokemonList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${REGION_RANGES[region].start}&limit=${REGION_RANGES[region].end}`
  ).then((res) => res.json());
  return Promise.all(
    results.map(async ({ url }) => await fetch(url).then((res) => res.json()))
  );
};

export const App = () => {
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

      const fetchedPokemons = await getPokemons(region);

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

  return (
    <div className="layout">
      <Header />

      <main className="container">
        <Filters
          region={region}
          searchTerm={searchTerm}
          sortBy={sortBy}
          onSearchChange={setSearchTerm}
          onRegionChange={setRegion}
          onSortChange={setSortBy}
        />

        <section>
          {(loading || filtering) && (
            <ul className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <li key={`placeholder-card-${index}`}>
                    <SkeletonCard />
                  </li>
                );
              })}
            </ul>
          )}

          {!filtering && !loading && processedPokemons.length > 0 && (
            <ul className="grid">
              {processedPokemons.map((pokemon) => {
                return (
                  <li key={`pokemon-card-${pokemon.id}`}>
                    <PokemonCard pokemon={pokemon} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {!loading && processedPokemons.length === 0 && (
          <p className="noresults">No results for "{searchTerm}"</p>
        )}
      </main>

      <Footer />
    </div>
  );
};
