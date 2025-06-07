import { useEffect, useState } from "react";
import { Region, SortItem, PokemonList, Pokemon, Stat } from "./types/types";
import { REGIONS } from "./constants/constants";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PokemonCard } from "./components/PokemonCard";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [processedPokemons, setProcessedPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [region, setRegion] = useState<Region>("kanto");
  const [isShowingRegions, setShowingRegions] = useState<boolean>(false);
  const [isShowingSort, setShowingSort] = useState<boolean>(false);
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

      {/* Searcher */}
      <main className="container">
        <section className="search">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="search__icon"
          >
            <path
              d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21 21L15 15"
              stroke="var(--color-neutral-400)"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search a Pokémon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Shows regions */}
          <div className="dropdown">
            <button
              role="combobox"
              aria-haspopup="listbox"
              aria-controls="reg-list"
              aria-label="Select reg"
              aria-expanded={isShowingRegions}
              className={`dropdown__button ${isShowingRegions ? "active" : ""}`}
              onClick={() =>
                setShowingRegions((prev) => {
                  if (isShowingSort) {
                    setShowingSort(false);
                  }
                  return !prev;
                })
              }
            >
              {region}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.6667 10L8.00004 12.6667L5.33337 10"
                  stroke="var(--color-neutral-600)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ol
              role="listbox"
              id="reg-list"
              hidden={!isShowingRegions}
              className={`dropdown__list ${!isShowingRegions ? "hide" : ""}`}
            >
              {REGIONS.map((key) => (
                <li
                  key={key}
                  role="radio"
                  aria-checked={region === key}
                  tabIndex={0}
                  className={region === key ? "active" : ""}
                  onClick={() => {
                    setRegion(key);
                    setShowingRegions(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setRegion(key);
                      setShowingRegions(false);
                    }
                  }}
                >
                  {key}
                </li>
              ))}
            </ol>
          </div>

          <button
            role="combobox"
            aria-haspopup="listbox"
            aria-controls="sort-list"
            aria-label="Sort by"
            aria-expanded={isShowingSort}
            className="sort__button"
            onClick={() =>
              setShowingSort((prev) => {
                if (isShowingRegions) setShowingRegions(false);
                return !prev;
              })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                isShowingSort
                  ? "var(--color-accent)"
                  : "var(--color-neutral-700)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l9 0" />
              <path d="M4 12l7 0" />
              <path d="M4 18l7 0" />
              <path d="M15 15l3 3l3 -3" />
              <path d="M18 6l0 12" />
            </svg>
          </button>

          {/* Muestra el menú de ordenación */}
          {isShowingSort && (
            <article className="sort__wrapper">
              <h3 className="sort__title">Sort by</h3>
              <div className="sort__items" role="listbox" id="sort-list">
                <span
                  role="radio"
                  aria-label="Default"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortBy === "default" ? "active" : ""
                  }`}
                  aria-checked={sortBy === "default"}
                  onClick={() => {
                    setSortBy("default");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("default");
                      setShowingSort(false);
                    }
                  }}
                >
                  Default
                </span>
                <span
                  role="radio"
                  aria-label="Health points"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortBy === "healthPoints" ? "active" : ""
                  }`}
                  aria-checked={sortBy === "healthPoints"}
                  onClick={() => {
                    setSortBy("healthPoints");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("healthPoints");
                      setShowingSort(false);
                    }
                  }}
                >
                  Hp
                </span>
                <span
                  role="radio"
                  aria-label="Attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortBy === "attack" ? "active" : ""
                  }`}
                  aria-checked={sortBy === "attack"}
                  onClick={() => {
                    setSortBy("attack");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("attack");
                      setShowingSort(false);
                    }
                  }}
                >
                  At
                </span>
                <span
                  role="radio"
                  aria-label="Defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortBy === "defense" ? "active" : ""
                  }`}
                  aria-checked={sortBy === "defense"}
                  onClick={() => {
                    setSortBy("defense");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("defense");
                      setShowingSort(false);
                    }
                  }}
                >
                  Df
                </span>
                <span
                  role="radio"
                  aria-label="Special attack"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortBy === "specialAttack" ? "active" : ""
                  }`}
                  aria-checked={sortBy === "specialAttack"}
                  onClick={() => {
                    setSortBy("specialAttack");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("specialAttack");
                      setShowingSort(false);
                    }
                  }}
                >
                  SpA
                </span>
                <span
                  role="radio"
                  aria-label="Special defense"
                  tabIndex={0}
                  className={`sort__pill ${
                    sortBy === "specialDefense" ? "active" : ""
                  }`}
                  aria-checked={sortBy === "specialDefense"}
                  onClick={() => {
                    setSortBy("specialDefense");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("specialDefense");
                      setShowingSort(false);
                    }
                  }}
                >
                  SpD
                </span>
                <span
                  role="radio"
                  aria-label="Speed"
                  tabIndex={0}
                  className={`sort__pill ${sortBy === "speed" ? "active" : ""}`}
                  aria-checked={sortBy === "speed"}
                  onClick={() => {
                    setSortBy("speed");
                    setShowingSort(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSortBy("speed");
                      setShowingSort(false);
                    }
                  }}
                >
                  Spd
                </span>
              </div>
            </article>
          )}
        </section>

        {/* Muestra cartas cargando */}
        <section>
          {(loading || filtering) && (
            <div className="grid" aria-hidden="true">
              {Array.from({ length: 6 }, (_, index) => {
                return (
                  <article
                    key={`placeholder-card-${index}`}
                    className="card card-placeholder"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M12,4C7.92,4 4.55,7.05 4.06,11H8.13C8.57,9.27 10.14,8 12,8C13.86,8 15.43,9.27 15.87,11H19.94C19.45,7.05 16.08,4 12,4M12,20C16.08,20 19.45,16.95 19.94,13H15.87C15.43,14.73 13.86,16 12,16C10.14,16 8.57,14.73 8.13,13H4.06C4.55,16.95 7.92,20 12,20M12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12C14,10.9 13.1,10 12,10Z" />
                    </svg>
                  </article>
                );
              })}
            </div>
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
