import React from 'react';
import { YahtzeeGame } from '../games/yahtzee/YahtzeeGame';
import { YahtzeePlayerData, YahtzeePlayer } from '../games/yahtzee/YahtzeePlayer';

const storageKey = 'yahtzeegame';

// TODO: Need an app-level setting for the last game ID to load by default?

const getStorageKey = (id: string) => `${storageKey}-${id}`;

// TODO: Switch to IndexedDB instead of local storage for saving games?

export const loadGame = (id: string) => {
  const data = localStorage.getItem(getStorageKey(id));
  if (!data) return null;
  const game = JSON.parse(data);
  // rehydrate class instances
  // TODO: Move this into the game class, possibly with generic type?
  game.players = game.players.map((p: YahtzeePlayerData) => YahtzeePlayer.fromData(p));
  return new YahtzeeGame(game);
};

export const saveGame = (game: YahtzeeGame) => {
  localStorage.setItem(getStorageKey(game.id), JSON.stringify(game));
};

interface IGameContext {
  game: YahtzeeGame | null;
  updateGame: (game: YahtzeeGame) => void;
}

export const GameContext = React.createContext<IGameContext>({
  game: null,
  updateGame: (game: YahtzeeGame | null) => {
    return;
  },
});
