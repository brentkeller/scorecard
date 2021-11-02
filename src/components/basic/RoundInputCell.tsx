import React from 'react';
import { BasicPlayer } from '../../games/basic/BasicPlayer';

export interface RoundInputCellProps {
  player: BasicPlayer;
  round: number;
  value?: number;
  updatePlayer: Function;
  tabIndex: number;
}

export const RoundInputCell: React.FC<RoundInputCellProps> = ({
  player,
  round,
  value,
  updatePlayer,
  tabIndex,
}) => {
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    player.updateScore(round, +event.target.value);
    updatePlayer(player);
  };

  const displayValue = value !== undefined ? value.toString() : '';

  return (
    <div className="cell input-cell">
      <input type="number" value={displayValue} onChange={changeValue} tabIndex={tabIndex} />
    </div>
  );
};
