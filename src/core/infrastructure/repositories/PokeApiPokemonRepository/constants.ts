import { Region } from "@/core/domain/models/Region";

export const REGION_RANGES: Record<Region, { start: number; end: number }> = {
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
