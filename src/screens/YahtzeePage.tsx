import * as React from 'react';
import { useParams } from 'react-router-dom';

interface GamePageParams {
  gameId: string;
}

export const YahtzeePage = () => {
  let { gameId } = useParams<GamePageParams>();

  return <div>Yahtzee game: {gameId}</div>;
};
