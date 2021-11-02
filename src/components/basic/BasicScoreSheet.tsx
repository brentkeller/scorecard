import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { BasicPlayer } from '../../games/basic/BasicPlayer';
import { BasicGame } from '../../games/basic/BasicGame';
import { Mobile, Default } from '../Responsive';
import { RoundInputCell } from './RoundInputCell';

interface IBasicScoreSheet {
  game: BasicGame;
  updateGame: (game: BasicGame) => void;
}

export const BasicScoreSheet: React.FC<IBasicScoreSheet> = ({ game, updateGame }) => {
  const updatePlayer = (player: BasicPlayer) => {
    game.updatePlayer(player);
    updateGame(game);
  };

  const nextPlayer = () => {
    game.changePlayerIndex(1);
    updateGame(game);
  };

  const prevPlayer = () => {
    game.changePlayerIndex(-1);
    updateGame(game);
  };

  const multiplePlayers = game && game.players.length > 1;
  let currentPlayer;
  if (game && game.players.length > 0 && game.currentPlayerIndex >= 0) {
    currentPlayer = game.players[game.currentPlayerIndex];
  }

  const roundListing = Array.from({ length: game.getRoundCount() + 1 }, (v, i) => (
    <div key={i + 1} className="cell">
      {i + 1}
    </div>
  ));

  function playerColumn(player: BasicPlayer, totalRounds: number, playerIndex: number) {
    const cells = Array.from({ length: totalRounds + 1 }, (v, i) => {
      const value = player.turns.find((d) => d.round === i)?.score;
      return (
        <RoundInputCell
          key={`${player.id}_${i}`}
          player={player}
          round={i}
          tabIndex={10 * i + playerIndex}
          value={value}
          updatePlayer={updatePlayer}
        />
      );
    });
    cells.push(
      <div key={`${player.id}_total`} className="cell score-cell">
        {player.total()}
      </div>,
    );
    return cells;
  }

  return (
    <div className="scoresheet">
      {game?.players && game?.players.length > 0 && (
        <div>
          <div className="cell">Round</div>
          {roundListing}
          <div className="cell">Total</div>
        </div>
      )}
      <Mobile>
        {currentPlayer ? (
          <div>
            <div className="cell player-name">
              {multiplePlayers && <MdChevronLeft onClick={prevPlayer} />}
              {currentPlayer.name}
              {multiplePlayers && <MdChevronRight onClick={nextPlayer} />}
            </div>
            {playerColumn(currentPlayer, game.getRoundCount() + 1, 1)}
          </div>
        ) : (
          <p>No players</p>
        )}
      </Mobile>
      <Default>
        {game?.players && game?.players.length > 0 ? (
          game?.players.map((p, index) => {
            return (
              <div key={p.id}>
                <div className="cell player-name">{p.name}</div>
                {playerColumn(p, game.getRoundCount(), index + 1)}
              </div>
            );
          })
        ) : (
          <p>No players</p>
        )}
      </Default>
    </div>
  );
};
