import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { GameList } from '../components/GameList';
import { GameTypeHeader } from '../components/GameTypeHeader';
import { BasicGame } from '../games/basic/BasicGame';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';
import { saveGame } from '../hooks/useGame';
import '../components/GameList.css';

export const Home = () => {
  let navigate = useNavigate();

  function newBasic() {
    const game = new BasicGame();
    saveGame(game);
    navigate(`/basic/${game.id}`);
  }

  function newYahtzee() {
    const game = new YahtzeeGame();
    saveGame(game);
    navigate(`/yahtzee/${game.id}`);
  }

  return (
    <div id="homepage">
      <h1>
        <img src="/logo128.png" alt="Score Card logo" style={{ height: 64, width: 64 }} />
        Score Card
      </h1>
      <h2>New Game</h2>
      <div className="game-list">
        <div className="card game-card">
          <GameTypeHeader type="basic" />
          <div className="game-card__summary">Basic score sheet for most games</div>
          <button type="button" className="btn game-card__full-button" onClick={newBasic}>
            Start New
          </button>
        </div>
        <div className="card game-card">
          <GameTypeHeader type="yahtzee" />
          <div className="game-card__summary">Score sheet for Yahtzee</div>
          <button type="button" className="btn game-card__full-button" onClick={newYahtzee}>
            Start New
          </button>
        </div>
      </div>
      <h2>Existing Games</h2>
      <GameList />
    </div>
  );
};
