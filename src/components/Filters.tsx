import { useState } from "react";
import { REGIONS, SORT_ITEMS } from "../constants/constants";
import { Region, SortItem } from "../types/types";

type FilterProps = {
  region: Region;
  searchTerm: string;
  sortBy: SortItem;
  onSearchChange: (searchTerm: string) => void;
  onRegionChange: (region: Region) => void;
  onSortChange: (sortBy: SortItem) => void;
};

type SortPillProps = {
  sortBy: SortItem;
  checked: boolean;
  onSortChange: (sortBy: SortItem) => void;
};

const sortMap: Record<SortItem, { shortName: string; name: string }> = {
  default: { shortName: "Default", name: "Default" },
  healthPoints: { shortName: "Hp", name: "Health Points" },
  attack: { shortName: "At", name: "Attack" },
  defense: { shortName: "Df", name: "Defense" },
  specialAttack: { shortName: "SpA", name: "Special Attack" },
  specialDefense: { shortName: "SpD", name: "Special Defense" },
  speed: { shortName: "Spd", name: "Speed" },
};

const SortPill: React.FC<SortPillProps> = ({
  sortBy,
  checked,
  onSortChange,
}) => {
  const { shortName, name } = sortMap[sortBy];

  return (
    <span
      role="radio"
      aria-label={name}
      tabIndex={0}
      className={`sort__pill ${checked ? "active" : ""}`}
      aria-checked={checked}
      onClick={() => onSortChange(sortBy)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSortChange(sortBy);
        }
      }}
    >
      {shortName}
    </span>
  );
};

export const Filters: React.FC<FilterProps> = ({
  region,
  searchTerm,
  sortBy,
  onSearchChange,
  onRegionChange,
  onSortChange,
}) => {
  const [isShowingRegions, setShowingRegions] = useState<boolean>(false);
  const [isShowingSort, setShowingSort] = useState<boolean>(false);
  return (
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
        onChange={(e) => onSearchChange(e.target.value)}
      />

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
                onRegionChange(key);
                setShowingRegions(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onRegionChange(key);
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
            isShowingSort ? "var(--color-accent)" : "var(--color-neutral-700)"
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

      {isShowingSort && (
        <article className="sort__wrapper">
          <h3 className="sort__title">Sort by</h3>
          <div className="sort__items" role="listbox" id="sort-list">
            {SORT_ITEMS.map((sortItem) => (
              <SortPill
                key={sortItem}
                sortBy={sortItem}
                checked={sortBy === sortItem}
                onSortChange={(item) => {
                  onSortChange(item);
                  setShowingSort(false);
                }}
              />
            ))}
          </div>
        </article>
      )}
    </section>
  );
};
