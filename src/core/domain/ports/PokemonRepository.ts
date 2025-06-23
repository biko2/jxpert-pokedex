import { Pokemon } from "@/core/domain/models/Pokemon";
import { Region } from "@/core/domain/models/Region";

export interface PokemonRepository {
  getByRegion(region: Region): Promise<Pokemon[]>;
}
