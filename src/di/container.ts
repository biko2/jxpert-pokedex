import { PokemonService } from "@/core/services/pokemon.service";
import { PokeApiAdapter } from "@/core/infrastructure/repositories/PokeApiPokemonRepository/adapter";

new PokemonService(new PokeApiAdapter());
