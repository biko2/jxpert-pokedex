import { Stat as StatType } from "@/core/domain/models/Stat";
import { Pokemon } from "@/core/domain/models/Pokemon";
import { Type } from "@/core/domain/models/type";
import { STATS } from "@/core/domain/constants/stats";
import bug from "@/assets/bug.svg";
import dark from "@/assets/dark.svg";
import dragon from "@/assets/dragon.svg";
import electric from "@/assets/electric.svg";
import fairy from "@/assets/fairy.svg";
import fighting from "@/assets/fighting.svg";
import fire from "@/assets/fire.svg";
import flying from "@/assets/flying.svg";
import ghost from "@/assets/ghost.svg";
import grass from "@/assets/grass.svg";
import ground from "@/assets/ground.svg";
import ice from "@/assets/ice.svg";
import normal from "@/assets/normal.svg";
import poison from "@/assets/poison.svg";
import psychic from "@/assets/psychic.svg";
import rock from "@/assets/rock.svg";
import steel from "@/assets/steel.svg";
import water from "@/assets/water.svg";
import { Stat } from "./components/Stat";
import { Favourite } from "./components/Favourite";

type PokemonProps = {
  pokemon: Pokemon;
  isFavourite: boolean;
  onFavouriteToggle: (isChecked: boolean) => void;
};

const TYPE_ICONS: Record<Type, string> = {
  bug,
  dark,
  dragon,
  electric,
  fairy,
  fighting,
  fire,
  flying,
  ghost,
  grass,
  ground,
  ice,
  normal,
  poison,
  psychic,
  rock,
  steel,
  water,
};

const INDEX_PAD_COUNT = 3;

const StatMap: Record<StatType, number> = {
  healthPoints: 0,
  attack: 1,
  defense: 2,
  specialAttack: 3,
  specialDefense: 4,
  speed: 5,
};

export const PokemonCard: React.FC<PokemonProps> = ({
  pokemon,
  isFavourite,
  onFavouriteToggle,
}) => {
  const customStyles: any = {
    "--color-type": `var(--color-${pokemon.types[0]}`,
  };

  return (
    <article className="card" style={customStyles}>
      <header className="card__head">
        <div className="card__tag">
          <p>#{pokemon.id.toString().padStart(INDEX_PAD_COUNT, "0")}</p>
        </div>
        <div className="card__tag">
          <img
            src={TYPE_ICONS[pokemon.types[0]]}
            className="card__type"
            alt={`${pokemon.types[0]} primary type`}
          />
          {pokemon.types[1] && (
            <img
              src={TYPE_ICONS[pokemon.types[1]]}
              className="card__type"
              alt={`${pokemon.types[1]} secondary type`}
            />
          )}
        </div>
      </header>
      <img
        className="card__avatar"
        src={pokemon.image}
        loading="lazy"
        alt={`${pokemon.name} artwork`}
      />
      <section className="card__content">
        <Favourite isChecked={isFavourite} onClick={onFavouriteToggle} />
        <h3 className="card__title">{pokemon.name}</h3>
        <ul aria-description="Stats resume">
          {STATS.map((stat) => (
            <li key={`${pokemon.name}-${stat}`}>
              <Stat stat={stat} value={pokemon.stats[StatMap[stat]].value} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
