import { REGIONS, SORT_ITEMS, TYPES } from "../constants/constants";

export type Type = (typeof TYPES)[number];
export type Region = (typeof REGIONS)[number];
export type SortItem = (typeof SORT_ITEMS)[number];
