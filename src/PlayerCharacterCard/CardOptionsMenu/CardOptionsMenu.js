import React from "react";
import "../../App.scss";

export const CardOptionsMenu = ({ deletePlayerCharacter }) => {
  return (
    <div id="card-options" className="row space-evenly">
      <button
        className="option-button primary"
        onClick={(event) => deletePlayerCharacter(event)}
      >
        DELETE
      </button>

      {/* <button onClick={resetToOriginal}>REFRESH</button> */}
    </div>
  );
};
