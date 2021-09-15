import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export const Home = () => {
  let history = useHistory();

  function newYahtzee() {
    const gameId = uuid();
    history.push(`/yahtzee/${gameId}`);
  }

  return (
    <div>
      <h1>Score Cards</h1>
      <div>
        <button type="button" onClick={newYahtzee}>
          Yahtzee
        </button>
      </div>
    </div>
  );
};
