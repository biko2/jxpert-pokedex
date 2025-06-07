import { Pokemon, Type } from "../types/types";
import bug from "../assets/bug.svg";
import dark from "../assets/dark.svg";
import dragon from "../assets/dragon.svg";
import electric from "../assets/electric.svg";
import fairy from "../assets/fairy.svg";
import fighting from "../assets/fighting.svg";
import fire from "../assets/fire.svg";
import flying from "../assets/flying.svg";
import ghost from "../assets/ghost.svg";
import grass from "../assets/grass.svg";
import ground from "../assets/ground.svg";
import ice from "../assets/ice.svg";
import normal from "../assets/normal.svg";
import poison from "../assets/poison.svg";
import psychic from "../assets/psychic.svg";
import rock from "../assets/rock.svg";
import steel from "../assets/steel.svg";
import water from "../assets/water.svg";

type PokemonProps = {
  pokemon: Pokemon;
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

export const PokemonCard: React.FC<PokemonProps> = ({ pokemon }) => {
  const customStyles: any = {
    "--color-type": `var(--color-${pokemon.types[0].type.name}`,
  };

  return (
    <article className="card" style={customStyles}>
      <header className="card__head">
        <div className="card__tag">
          <p>#{pokemon.id.toString().padStart(3, "0")}</p>
        </div>
        <div className="card__tag">
          <img
            src={TYPE_ICONS[pokemon.types[0].type.name]}
            className="card__type"
            alt={`${pokemon.types[0].type.name} primary type`}
          />
          {pokemon.types[1] && (
            <img
              src={TYPE_ICONS[pokemon.types[1].type.name]}
              className="card__type"
              alt={`${pokemon.types[1].type.name} secondary type`}
            />
          )}
        </div>
      </header>
      <img
        className="card__avatar"
        src={pokemon.sprites.other["official-artwork"].front_default}
        loading="lazy"
        alt={`${pokemon.name} artwork`}
      />
      <section className="card__content">
        <h3 className="card__title">{pokemon.name}</h3>
        <ul aria-description="Stats resume">
          <li className="card__stat" aria-label="Health points">
            <div className="stat__value">
              <p className="stat__name" aria-hidden="true">
                Hp
              </p>
              <p>{pokemon.stats[0].base_stat}</p>
            </div>
            <progress value={pokemon.stats[0].base_stat} max="255"></progress>
          </li>
          <li className="card__stat" aria-label="Attack">
            <div className="stat__value">
              <p className="stat__name" aria-hidden="true">
                At
              </p>
              <p>{pokemon.stats[1].base_stat}</p>
            </div>
            <progress value={pokemon.stats[1].base_stat} max="255"></progress>
          </li>
          <li className="card__stat" aria-label="Defense">
            <div className="stat__value">
              <p className="stat__name" aria-hidden="true">
                Df
              </p>
              <p>{pokemon.stats[2].base_stat}</p>
            </div>
            <progress value={pokemon.stats[2].base_stat} max="255"></progress>
          </li>
          <li className="card__stat" aria-label="Special attack">
            <div className="stat__value">
              <p className="stat__name" aria-hidden="true">
                SpA
              </p>
              <p>{pokemon.stats[3].base_stat}</p>
            </div>
            <progress value={pokemon.stats[3].base_stat} max="255"></progress>
          </li>
          <li className="card__stat" aria-label="Special defense">
            <div className="stat__value">
              <p className="stat__name" aria-hidden="true">
                SpD
              </p>
              <p>{pokemon.stats[4].base_stat}</p>
            </div>
            <progress value={pokemon.stats[4].base_stat} max="255"></progress>
          </li>
          <li className="card__stat" aria-label="Speed">
            <div className="stat__value">
              <p className="stat__name" aria-hidden="true">
                Spd
              </p>
              <p>{pokemon.stats[5].base_stat}</p>
            </div>
            <progress value={pokemon.stats[5].base_stat} max="255"></progress>
          </li>
        </ul>
      </section>
    </article>
  );
};
