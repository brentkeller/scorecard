import React, { useState } from 'react';
import { GameInfo } from '../games/Game';
import { listGames } from '../hooks/db';
import { Link } from 'react-router-dom';
import './GameList.css';

export function GameList() {
  const [games, setGames] = useState<GameInfo[]>([]);

  React.useEffect(() => {
    async function loadGames() {
      const result = await listGames();
      setGames(result);
    }
    loadGames();
  }, []);

  const gameCards = games.map((g) => (
    <div key={g.id} className="game-card">
      <div className="game-card__type">{g.type}</div>
      <div className="game-card__date">{g.date.toLocaleString()}</div>
      <Link to={`/${g.type}/${g.id}`} className="btn game-card__link-button">
        Open
      </Link>
    </div>
  ));

  return <div className="game-list">{gameCards}</div>;
}
