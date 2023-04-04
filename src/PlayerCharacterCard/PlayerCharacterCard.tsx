import React, { useEffect } from "react";
import { Character } from "../App";
import { CharBasics } from "./CharBasics/CharBasics";
import { CharHealth } from "./CharHealth/CharHealth";

type PlayerCharacterCardProps = {
  character: Character,
  setCharacter: React.Dispatch<React.SetStateAction<Character>>
}

export const PlayerCharacterCard = ({
  character, setCharacter }: PlayerCharacterCardProps) => {
  
    const {
      playerName,
      charName,
      charConcept,
      charImage,
      maxHealth,
      currentHealth,
      // notes,
      // antiJoker,
      attributes,
      stats,
      // chosenMasteries,
      // chosenPractices,
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

    setCharacter(character)
  }
      

    useEffect(() => {
      initializePlayerCharacter();
    }, []);

    // const updateCharacterStats = (statToChange, newValue) => {
    //   setPlayerCharacters(
    //     playerCharacters.map((character, i) => {
    //       if (i === playerIndex) {
    //         const updatedCharacter = {
    //           ...character,
    //           stats: {
    //             ...stats,
    //             [statToChange]: newValue,
    //           },
    //         };
    //         return updatedCharacter;
    //       }
    //       return character;
    //     })
    //   );
    // };

    // const statStepUp = (e) => {
    //   const { name, value } = e.target;
    //   const numValue = parseInt(value) + 1;
    //   updateCharacterStats(name, numValue);
    // };

    // const statStepDown = (e) => {
    //   const { name, value } = e.target;
    //   const numValue = parseInt(value) - 1;
    //   if (value > 0) {
    //     updateCharacterStats(name, numValue);
    //   }
    // };

    // const toggleAntiJoker = () => {
    //   setPlayerCharacters(
    //     playerCharacters.map((character, i) => {
    //       if (i === playerIndex) {
    //         const updatedCharacter = {
    //           ...character,
    //           antiJoker: !antiJoker,
    //         };
    //         return updatedCharacter;
    //       }
    //       return character;
    //     })
    //   );
    // };

    // const updateNotes = (e) => {
    //   const updatedNotes = e.target.value;
    //   setPlayerCharacters(
    //     playerCharacters.map((character, i) => {
    //       if (i === playerIndex) {
    //         const updatedCharacter = {
    //           ...character,
    //           notes: updatedNotes,
    //         };
    //         return updatedCharacter;
    //       }
    //       return character;
    //     })
    //   );
    // };

    const healthRatio = parseInt((currentHealth / maxHealth).toFixed(2));

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
        {/*<div className="attributes">
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
          <CardOptionsMenu
            playerIndex={playerIndex}
            deletePlayerCharacter={deletePlayerCharacter}
          // resetToOriginal={resetToOriginal}
          />
        </div>
        ultimates */}
      </main>
    );
  };
