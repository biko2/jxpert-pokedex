export const TYPES = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
] as const;

export const REGIONS = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
] as const;

export const STATS = [
  "healthPoints",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
] as const;

export const SORT_ITEMS = ["default", ...STATS] as const;
