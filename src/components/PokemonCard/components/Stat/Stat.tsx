import { Stat as StatType } from "../../../../types/types";

type StatProps = {
  stat: StatType;
  value: number;
};

const STAT_MAXIMUM = 255;

const statMap: Record<StatType, { shortName: string; name: string }> = {
  healthPoints: { shortName: "Hp", name: "Health Points" },
  attack: { shortName: "At", name: "Attack" },
  defense: { shortName: "Df", name: "Defense" },
  specialAttack: { shortName: "SpA", name: "Special Attack" },
  specialDefense: { shortName: "SpD", name: "Special Defense" },
  speed: { shortName: "Spd", name: "Speed" },
};

export const Stat: React.FC<StatProps> = ({ stat, value }) => {
  const { shortName, name } = statMap[stat];

  return (
    <div className="card__stat" aria-label={name}>
      <div className="stat__value">
        <p className="stat__name" aria-hidden="true">
          {shortName}
        </p>
        <p>{value}</p>
      </div>
      <progress value={value} max={STAT_MAXIMUM}></progress>
    </div>
  );
};
