import Link from "next/link";
import React from "react";
import cardStyles from "./CharacterCard.module.scss";

interface singleCharacter {
  id: number;
  name: string;
  status: string;
  gender: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
}

interface Props {
  character: singleCharacter;
}

const CharacterCard = ({ character }: Props) => {
  return (
    <>
      <Link href={`/characters/${character.id}`}>
        <div className={cardStyles[`character-card`]}>
          <div className={cardStyles[`character__image-container`]}>
            <img
              className={cardStyles.character__image}
              src={character.image}
              alt={`Picture of ${character.name}`}
            />
            <p
              className={
                character.status === "Alive"
                  ? `${cardStyles.character__status} ${
                      cardStyles[`character__status--alive`]
                    }`
                  : character.status === "Dead"
                  ? `${cardStyles.character__status} ${
                      cardStyles[`character__status--dead`]
                    }`
                  : `${cardStyles.character__status} ${
                      cardStyles[`character__status--unknown`]
                    }`
              }
            >
              {character.status}
            </p>
          </div>

          <div className={cardStyles.character__details}>
            <p className={cardStyles.character__name}>{character.name}</p>
            <p className={cardStyles.character__gender}>
              {character.gender} - {character.species}
            </p>
            <p className={cardStyles[`character__location--title`]}>
              Last Location:
            </p>
            <p className={cardStyles.character__location}>
              {character.location.name}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CharacterCard;
