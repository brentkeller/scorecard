import { v4 as uuid } from 'uuid';
import { Game } from '../Game';
import { BasicPlayer } from './BasicPlayer';

export class BasicGame extends Game {
  players!: BasicPlayer[];
  rounds = 0;

  static fromGame(game: Game) {
    const newGame = new BasicGame(game.id);
    if (game) {
      newGame.date = game.date;
      newGame.currentPlayerIndex = game.currentPlayerIndex;
      newGame.players = (game.players as BasicPlayer[]).map((p) => BasicPlayer.fromData(p));
      newGame.rounds = (game as BasicGame).rounds;
    }
    return newGame;
  }

  constructor(id?: string) {
    super(id ?? uuid(), 'basic');
    this.players = [];
  }

  addPlayer(name: string) {
    if (!this.players) this.players = [];
    this.players.push(new BasicPlayer(name));
  }

  getRoundCount() {
    return Math.max(...this.players.map((p) => p.turns?.length ?? 0));
  }

  // TODO: Create a summary method to show basic info about the game?
  // Maybe: # or players, rounds completed, etc.
  summary() {
    return '';
  }
}
