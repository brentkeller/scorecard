import { v4 as uuid } from 'uuid';
import { Game } from '../Game';

import { YahtzeePlayer } from './YahtzeePlayer';

export class YahtzeeGame extends Game {
  players!: YahtzeePlayer[];

  static fromGame(game: Game) {
    const newGame = new YahtzeeGame(game.id);
    if (game) {
      newGame.date = game.date;
      newGame.currentPlayerIndex = game.currentPlayerIndex;
      newGame.players = (game.players as YahtzeePlayer[]).map((p) => YahtzeePlayer.fromData(p));
    }
    return newGame;
  }

  constructor(id?: string) {
    super(id ?? uuid(), 'yahtzee');
    this.players = [];
  }

  addPlayer(name: string) {
    if (!this.players) this.players = [];
    this.players.push(new YahtzeePlayer(name));
  }

  summary() {
    return super.summary();
  }
}
