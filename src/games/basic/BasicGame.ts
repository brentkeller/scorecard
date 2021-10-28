import { v4 as uuid } from 'uuid';
import { Game } from '../Game';
import { BasicPlayer } from './BasicPlayer';

export class BasicGame extends Game {
  players!: BasicPlayer[];

  // TODO: Implement necessary overrides of Game.ts

  constructor(game?: BasicGame | null) {
    super(game?.id ?? uuid(), 'basic');
    if (game) {
      this.date = game.date;
      this.players = game.players;
      this.currentPlayerIndex = game.currentPlayerIndex;
    }
  }

  static createGame(id: string) {
    return new BasicGame({
      id,
      date: new Date(),
      players: [] as BasicPlayer[],
      currentPlayerIndex: 0,
    } as BasicGame);
  }

  // TODO: Create a summary method to show basic info about the game?
  // Maybe: # or players, rounds completed, etc.
  summary() {
    return '';
  }
}
