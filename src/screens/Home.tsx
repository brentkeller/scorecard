import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { BasicGame } from '../games/basic/BasicGame';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';
import { saveGame } from '../hooks/useGame';

export const Home = () => {
  let history = useHistory();

  function newBasic() {
    const game = new BasicGame();
    saveGame(game);
    history.push(`/basic/${game.id}`);
  }

  function newYahtzee() {
    const game = new YahtzeeGame();
    saveGame(game);
    history.push(`/yahtzee/${game.id}`);
  }

  return (
    <div>
      <h1>Score Cards</h1>
      <div>
        <button type="button" onClick={newBasic}>
          Basic
        </button>
        <button type="button" onClick={newYahtzee}>
          Yahtzee
        </button>
      </div>
    </div>
  );
};
