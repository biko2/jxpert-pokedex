import { Stat } from "./Stat";
import { Type } from "./type";

type StatContent = {
  name: Stat;
  value: number;
};

export type Pokemon = {
  id: number;
  name: string;
  types: Type[];
  stats: StatContent[];
  height: number;
  images: {
    artwork: string;
    sprite: string;
  };
};
