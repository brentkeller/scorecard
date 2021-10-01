import React from 'react';
import { Game } from '../models/game';
import { PlayerData, Player } from '../models/player';

const storageKey = 'yahtzeegame';

// TODO: Need an app-level setting for the last game ID to load by default?

const getStorageKey = (id: string) => `${storageKey}-${id}`;

// TODO: Switch to IndexedDB instead of local storage for saving games?

export const loadGame = (id: string) => {
  const data = localStorage.getItem(getStorageKey(id));
  if (!data) return null;
  const game = JSON.parse(data);
  // rehydrate class instances
  game.players = game.players.map((p: PlayerData) => Player.fromData(p));
  return new Game(game);
};

export const saveGame = (game: Game) => {
  localStorage.setItem(getStorageKey(game.id), JSON.stringify(game));
};

interface IGameContext {
  game: Game | null;
  updateGame: (game: Game) => void;
}

export const GameContext = React.createContext<IGameContext>({
  game: null,
  updateGame: (game: Game | null) => {
    return;
  },
});
