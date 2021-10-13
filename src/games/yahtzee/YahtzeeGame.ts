import { v4 as uuid } from 'uuid';
import { Game } from '../Game';

import { YahtzeePlayer } from './YahtzeePlayer';

export class YahtzeeGame extends Game<YahtzeePlayer> {
  constructor(game?: YahtzeeGame | null) {
    super(game?.id ?? uuid(), 'yahtzee');
    if (game) {
      this.date = game.date;
      this.players = game.players;
      this.currentPlayerIndex = game.currentPlayerIndex;
    }
  }

  static createGame(id: string) {
    return new YahtzeeGame({
      id,
      date: new Date(),
      players: [] as YahtzeePlayer[],
      currentPlayerIndex: 0,
    } as YahtzeeGame);
  }

  // TODO: Create a summary method to show basic info about the game?
  // Maybe: # or players, rounds completed, etc.
  summary() {
    return '';
  }
}
