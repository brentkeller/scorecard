import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';
import { saveGame } from '../hooks/useGame';

export const Home = () => {
  let history = useHistory();

  function newYahtzee() {
    const game = new YahtzeeGame();
    saveGame(game);
    history.push(`/yahtzee/${game.id}`);
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
