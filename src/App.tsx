import React, { useEffect, useState } from "react";
import "./App.scss";
import { PlayerCharacterCard } from "./PlayerCharacterCard/PlayerCharacterCard";
export type Character = {
  playerName: string;
  charName: string;
  charConcept: string;
  charImage: string;
  maxHealth: number;
  currentHealth: number;
  currentStatus: string;
  notes: string;
  antiJoker: boolean;
  attributes: {
    brawn: number;
    agility: number;
    intelligence: number;
    wit: number;
    charm: number;
    presence: number;
  };
  stats: {
    initiative: number;
    dodge: number;
    drive: number;
    crit: number;
    heroPoints: number;
  };
  chosenMasteries: [
    {
      name: string;
      text: string;
    }
  ];
  chosenPractices: [
    {
      name: string;
      text: string;
    }
  ];
};
function App() {
  const [character, setCharacter] = useState<Character>({
    playerName: "Catalyst",
    charName: "Demo Character",
    charConcept:
      "I'm here to introduce you to the app! Feel free to delete me when you're ready.",
    charImage:
      "https://images.assetsdelivery.com/compings_v2/putracetol/putracetol1805/putracetol180506437.jpg",
    maxHealth: 0,
    currentHealth: 0,
    currentStatus: "Healthy (+1)",
    notes:
      "Type notes here to keep track of your useful items or favorite bits of space-trivia.",
    antiJoker: true,
    attributes: {
      brawn: 4,
      agility: 2,
      intelligence: 1,
      wit: 1,
      charm: 2,
      presence: 3,
    },
    stats: {
      initiative: 0,
      dodge: 0,
      drive: 0,
      crit: 0,
      heroPoints: 0,
    },
    chosenMasteries: [
      {
        name: "Masteries",
        text: "Masteries are a character's best skills, generally representing the actions a character is known for. A character with a Mastery in Melee may have trained in hand-to-hand combat from a young age. A Master of Biology may be one of the top experts in their field. A Master of Lying could be a lifelong grifter. Masteries give you + 4 cards to a related flip.",
      },
    ],
    chosenPractices: [
      {
        name: "Practices",
        text: "Practices represent a skill your character is familiar with. You know, like something you practice. Unlike Masteries, Practices tend to be more fluid. Practices give you + 2 cards to a related flip.",
      },
    ],
  });

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(character));
  }, [character]);

  return (
    <div id="App">
      <PlayerCharacterCard character={character} setCharacter={setCharacter} />
    </div>
  );
}

export default App;
