import { SortItem } from "@/types/types";

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

export const SortPill: React.FC<SortPillProps> = ({
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
