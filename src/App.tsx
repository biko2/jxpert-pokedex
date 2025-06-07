import { useEffect, useState } from "react";
import { Region, SortItem, PokemonList, Pokemon, Stat } from "./types/types";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PokemonCard } from "./components/PokemonCard";
import { SkeletonCard } from "./components/SkeletonCard";
import { Filters } from "./components/Filters";
import { usePokemons } from "./hooks/usePokemons";

export const App = () => {
  const {
    region,
    searchTerm,
    sortBy,
    loading,
    filtering,
    pokemons: processedPokemons,
    onSearchChange,
    onRegionChange,
    onSortChange,
  } = usePokemons();

  return (
    <div className="layout">
      <Header />

      <main className="container">
        <Filters
          region={region}
          searchTerm={searchTerm}
          sortBy={sortBy}
          onSearchChange={onSearchChange}
          onRegionChange={onRegionChange}
          onSortChange={onSortChange}
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
