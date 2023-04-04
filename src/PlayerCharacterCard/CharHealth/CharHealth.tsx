import React, { useState, useEffect } from "react";
import "./CharHealth.scss";
import redDotImage from "../../Assets/Images/icons8-red-circle-96.png";
import yellowDotImage from "../../Assets/Images/icons8-yellow-circle-96.png";
import greenDotImage from "../../Assets/Images/icons8-green-circle-96.png";
import chevDown from "../../Assets/Images/icons8-chevron-down-white.png";
import chevUp from "../../Assets/Images/icons8-chevron-up-white.png";
import "./CharHealth.scss";
import "../../App.scss";

import { Character } from "../../App";

type CharHealthProps = {
  maxHealth: number;
  currentHealth: number;
  healthRatio: number;
  character: Character;
  setCharacter: React.Dispatch<React.SetStateAction<Character>>;
};

export const CharHealth = ({
  maxHealth,
  currentHealth,
  healthRatio,
  character,
  setCharacter,
}: CharHealthProps) => {
  const [condition, setCondition] = useState<string>("Healthy (+1)");
  const [healthBar, setHealthBar] = useState<any[]>([
    <img key={Math.random()} src="" alt="" />,
  ]);

  useEffect(() => {
    let red = [];
    let yellow = [];
    let green = [];
    let bar = [];
    const healthDots = maxHealth / 3;
    for (let i = 0; i < healthDots; i++) {
      red.push(
        <img
          key={Math.random()}
          className="health-bar-dot"
          src={redDotImage}
          alt="red dot"
        />
      );
      yellow.push(
        <img
          key={Math.random()}
          className="health-bar-dot"
          src={yellowDotImage}
          alt="yellow dot"
        />
      );
      green.push(
        <img
          key={Math.random()}
          className="health-bar-dot"
          src={greenDotImage}
          alt="green dot"
        />
      );
    }

    bar = red.concat(yellow, green);
    setHealthBar(bar);
  }, [maxHealth]);

  useEffect(() => {
    const healthDifferential = Math.abs(maxHealth - currentHealth);
    console.log("healthDifferential", healthDifferential);
    if (healthDifferential) {
      const reducedHealth = () => {
        return healthBar.slice(0, -healthDifferential);
      };
      console.log("reducedHealth", reducedHealth());
      setHealthBar(reducedHealth);
    }
  }, []);

  const addHealth = () => {
    if (currentHealth < maxHealth) {
      const healthDot = () => {
        if (healthRatio < 0.33) {
          return (
            <img
              key={Math.random()}
              className="health-bar-dot"
              src={redDotImage}
              alt="red dot"
            />
          );
        } else if (healthRatio >= 0.33 && healthRatio <= 0.66) {
          return (
            <img
              key={Math.random()}
              className="health-bar-dot"
              src={yellowDotImage}
              alt="yellow dot"
            />
          );
        } else if (healthRatio >= 0.67) {
          return (
            <img
              key={Math.random()}
              className="health-bar-dot"
              src={greenDotImage}
              alt="green dot"
            />
          );
        }
      };

      let healthBarCopy = healthBar;
      healthBarCopy.push(healthDot());
      setHealthBar(healthBarCopy);

      if (currentHealth >= 0) {
        const updatedCharacter = {
          ...character,
          currentHealth: (currentHealth += 1),
        };
        setCharacter(updatedCharacter);
      }
    }
  };

  const subtractHealth = () => {
    const lessOne = healthBar.slice(0, -1);
    setHealthBar(lessOne);

    if (currentHealth >= 1) {
      const updatedCharacter = {
        ...character,
        currentHealth: currentHealth - 1,
      };
      setCharacter(updatedCharacter);
    }
  };

  const displayCondition = () => {
    if (healthRatio == 0.0) {
      setCondition("DEAD :(");
    } else if (healthRatio > 0.0 && healthRatio <= 0.33) {
      setCondition("Unconscious");
    } else if (healthRatio >= 0.34 && healthRatio <= 0.67) {
      setCondition("Injured");
    } else if (healthRatio >= 0.68 || healthRatio === 1.0) {
      setCondition("Healthy (+1)");
    }
  };

  useEffect(() => {
    displayCondition();
  }, [healthRatio]);

  const healthBarBackground = () => {
    const dots = [];
    for (let index = 0; index < 12; index++) {
      const dot = (
        <img
          key={Math.random()}
          className="health-bar-background-dot"
          src={greenDotImage}
          alt="green health dot"
        />
      );
      dots.push(dot);
    }
    return dots;
  };

  return (
    <section id="char-health">
      <h3 className="section-title">Health</h3>

      <div id="health-display">
        <div id="health-total">
          <div id="max-health">{maxHealth}</div>
          <img
            className="health-total-background"
            src={greenDotImage}
            alt="dot"
          />
        </div>
        <div className="health-bar">{healthBar}</div>
        <div className="health-bar-background">{healthBarBackground()}</div>
      </div>

      <div id="health-condition">
        <img
          className="health-stepper"
          src={chevDown}
          onClick={subtractHealth}
          alt="downward facing chevron"
        />

        <span>Condition:</span>
        <article
          className={
            (condition === "Healthy (+1)" ? "green" : "") ||
            (condition === "Injured" ? "yellow" : "") ||
            (condition === "Unconscious" ? "red" : "")
          }
        >
          <b>{condition}</b>
        </article>
        <img
          className="health-stepper"
          src={chevUp}
          onClick={addHealth}
          alt="upward facing chevron"
        />
      </div>
    </section>
  );
};
