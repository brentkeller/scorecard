import React from 'react';
import { Game } from '../games/Game';
import { getGame, storeGame } from './db';

// TODO: Need an app-level setting for the last game ID to load by default?

export const loadGame = async <T extends Game>(id: string, rehydrate: (game: T) => T) => {
  const game = await getGame<T>(id);
  if (game == null) return null;
  return rehydrate(game);
};

export const saveGame = async (game: Game) => {
  await storeGame(game);
};

interface IGameContext<T extends Game> {
  game: T | null;
  updateGame: (game: T) => void;
}

export function createGameContext<T extends Game>() {
  return React.createContext<IGameContext<T>>({
    game: null,
    updateGame: (game: T | null) => {
      return;
    },
  });
}
