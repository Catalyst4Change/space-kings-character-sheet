import React, { useEffect } from "react";
import { Character } from "../App";
import { CharBasics } from "./CharBasics/CharBasics";
import { CharHealth } from "./CharHealth/CharHealth";
import { CharStats } from "./CharStats/CharStats";
import { CharAttributes } from "./CharAttributes/CharAttributes";
import { CharMasteries } from "./CharMasteries/CharMasteries";
import { CharPractices } from "./CharPractices/CharPractices";
import { CardOptionsMenu } from "./CardOptionsMenu/CardOptionsMenu";

type PlayerCharacterCardProps = {
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

export const PlayerCharacterCard = ({
  character,
  setCharacter,
}: PlayerCharacterCardProps) => {
  const {
    playerName,
    charName,
    charConcept,
    charImage,
    maxHealth,
    currentHealth,
    notes,
    antiJoker,
    attributes,
    stats,
    chosenMasteries,
    chosenPractices,
  } = character;

  const initializePlayerCharacter = () => {
    const newMaxHealth = attributes.brawn * 3;
    const newInitiative = attributes.presence + attributes.agility;
    const newCrit = attributes.charm;
    const newDodge = attributes.agility + attributes.wit - 2;
    const newDrive = attributes.wit + attributes.presence;

    character.currentHealth = newMaxHealth;
    character.maxHealth = newMaxHealth;
    character.stats = {
      ...stats,
      initiative: newInitiative,
      crit: newCrit,
      dodge: newDodge,
      drive: newDrive,
    };

    setCharacter(character);
  };

  useEffect(() => {
    initializePlayerCharacter();
  }, []);

  const updateCharacterStats = (statToChange: string, newValue: number) => {
    const updatedCharacter = {
      ...character,
      stats: {
        ...stats,
        [statToChange]: newValue,
      },
    };
    setCharacter(updatedCharacter);
  };

  const statStepUp = (e: any) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) + 1;
    updateCharacterStats(name, numValue);
  };

  const statStepDown = (e: any) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) - 1;
    if (value > 0) {
      updateCharacterStats(name, numValue);
    }
  };

  const toggleAntiJoker = () => {
    const updatedCharacter = {
      ...character,
      antiJoker: !antiJoker,
    };
    setCharacter(updatedCharacter);
  };

  const updateNotes = (e: any) => {
    const updatedNotes = e.target.value;
    const updatedCharacter = {
      ...character,
      notes: updatedNotes,
    };
    setCharacter(updatedCharacter);
  };

  const healthRatio = parseInt((currentHealth / maxHealth).toFixed(2));

  const deletePlayerCharacter = () => {};

  return (
    <main className="character-card">
      <div className="basics">
        <CharBasics
          playerName={playerName}
          charName={charName}
          charConcept={charConcept}
          charImage={charImage}
        />
      </div>
      <hr></hr>
      <div className="health">
        <CharHealth
          maxHealth={maxHealth}
          currentHealth={currentHealth}
          healthRatio={healthRatio}
          character={character}
          setCharacter={setCharacter}
        />
      </div>
      <hr></hr>
      <div className="attributes">
        <CharStats
          stats={stats}
          statStepUp={statStepUp}
          statStepDown={statStepDown}
          antiJoker={antiJoker}
          toggleAntiJoker={toggleAntiJoker}
        />
        <CharAttributes attributes={attributes} />
      </div>
      <hr></hr>
      <div className="masteries">
        <CharMasteries chosenMasteries={chosenMasteries} />
      </div>
      <div className="practices ">
        <CharPractices chosenPractices={chosenPractices} />
      </div>
      <hr></hr>
      <div className="notes-area column center">
        <textarea
          value={notes}
          className="char-notes-text"
          placeholder="Notes..."
          onChange={(event) => updateNotes(event)}
        ></textarea>
      </div>
      <div className="card-options">
        <CardOptionsMenu deletePlayerCharacter={deletePlayerCharacter} />
      </div>
      ultimates
    </main>
  );
};
