import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PokemonCard } from "@/components/PokemonCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Filters } from "@/components/Filters";
import { usePokemons } from "@/hooks/usePokemons";
import { useFavourites } from "@/hooks/useFavourites";

const SKELETON_CARD_COUNT = 6;

export const App = () => {
  const {
    region,
    searchTerm,
    sortBy,
    loading,
    filtering,
    pokemons,
    onSearchChange,
    onRegionChange,
    onSortChange,
  } = usePokemons();

  const { favourites, onFavouriteToggle } = useFavourites();

  const isLoading = loading || filtering;
  const showResults = !loading && !filtering && pokemons.length > 0;
  const noResults = !loading && !filtering && pokemons.length === 0;

  return (
    <>
      <Filters
        region={region}
        searchTerm={searchTerm}
        sortBy={sortBy}
        onSearchChange={onSearchChange}
        onRegionChange={onRegionChange}
        onSortChange={onSortChange}
      />

      <section>
        {isLoading && (
          <ul className="grid" aria-hidden="true">
            {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => {
              return (
                <li key={`placeholder-card-${index}`}>
                  <SkeletonCard />
                </li>
              );
            })}
          </ul>
        )}

        {showResults && (
          <ul className="grid">
            {pokemons.map((pokemon) => {
              return (
                <li key={`pokemon-card-${pokemon.id}`}>
                  <PokemonCard
                    pokemon={pokemon}
                    isFavourite={favourites.some(
                      (favourite) => favourite.id === pokemon.id
                    )}
                    onFavouriteToggle={onFavouriteToggle}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {noResults && <p className="noresults">No results for "{searchTerm}"</p>}
    </>
  );
};
