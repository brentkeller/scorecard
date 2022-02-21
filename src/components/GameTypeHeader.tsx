import * as React from 'react';
import { GiInvertedDice6 } from 'react-icons/gi';
import { VscTable } from 'react-icons/vsc';

export function GameTypeHeader({ type }: { type: string }) {
  const icon = type === 'basic' ? <VscTable /> : <GiInvertedDice6 />;
  const label = type === 'basic' ? 'Basic' : 'Yahtzee';
  return (
    <span className="game-card__type">
      {icon}
      <strong>{label}</strong>
    </span>
  );
}
