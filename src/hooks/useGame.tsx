import React from 'react';
import { Game } from '../games/Game';

const storageKey = 'scorecard';

// TODO: Need an app-level setting for the last game ID to load by default?

const getStorageKey = (id: string) => `${storageKey}-${id}`;

// TODO: Switch to IndexedDB instead of local storage for saving games?

export const loadGame = <T extends Game>(id: string, rehydrate: (game: T) => T) => {
  const data = localStorage.getItem(getStorageKey(id));
  if (!data) return null;
  const game: T = JSON.parse(data);
  return rehydrate(game);
};

export const saveGame = (game: Game) => {
  localStorage.setItem(getStorageKey(game.id), JSON.stringify(game));
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
