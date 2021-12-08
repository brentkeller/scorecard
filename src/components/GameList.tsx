import React, { useState } from 'react';
import { GameInfo } from '../games/Game';
import { deleteGame, listGames } from '../hooks/db';
import { Link } from 'react-router-dom';
import './GameList.css';
import { Button } from './Button';

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

  const gameCards = games.map((g) => (
    <div key={g.id} className="game-card">
      <div className="game-card__type">{g.type}</div>
      <div className="game-card__date">{g.date.toLocaleString()}</div>
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
