import React, { useState } from 'react';
import { Game, GameInfo } from '../games/Game';
import { deleteGame, listGames } from '../hooks/db';
import { Link } from 'react-router-dom';
import './GameList.css';
import { Button } from './Button';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';
import { BasicGame } from '../games/basic/BasicGame';

export function GameList() {
  const [games, setGames] = useState<GameInfo[]>([]);

  React.useEffect(() => {
    loadGames();
  }, []);

  async function loadGames() {
    const result = await listGames();
    setGames(result);
  }

  async function removeGame(id: string) {
    await deleteGame(id);
    await loadGames();
  }

  function hydrateGame(game: Game) {
    if (game.type === 'basic') return BasicGame.fromGame(game);
    if (game.type === 'yahtzee') return YahtzeeGame.fromGame(game);
    return game;
  }

  const gameCards = games.map((g) => (
    <div key={g.id} className="game-card">
      <div className="game-card__type">{g.type}</div>
      <div className="game-card__date">{g.date.toLocaleString()}</div>
      <div className="game-card__summary">{hydrateGame(g.game).summary()}</div>
      <Link to={`/${g.type}/${g.id}`} className="btn game-card__link-button">
        Open
      </Link>
      <Button className="outline game-card__delete-button" onClick={() => removeGame(g.id)}>
        Delete
      </Button>
    </div>
  ));

  return <div className="game-list">{gameCards}</div>;
}
