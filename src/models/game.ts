import { v4 as uuid } from 'uuid';

import { Player } from './player';

export class Game {
  id: string;
  date: Date;
  players: Player[];
  currentPlayerIndex: number;

  constructor(game?: Game | null) {
    if (game) {
      this.id = game.id;
      this.date = game.date;
      this.players = game.players;
      this.currentPlayerIndex = game.currentPlayerIndex;
    } else {
      this.id = uuid();
      this.date = new Date();
      this.players = [];
      this.currentPlayerIndex = 0;
    }
  }

  static createGame(id: string) {
    return new Game({
      id,
      date: new Date(),
      players: [] as Player[],
      currentPlayerIndex: 0,
    } as Game);
  }

  addPlayer(player: Player) {
    if (!this.players) this.players = [];
    this.players.push(player);
  }

  removePlayer(player: Player) {
    const index = this.players.findIndex((p) => p.id === player.id);
    this.players.splice(index, 1);
    this.currentPlayerIndex = 0;
    //if (this.currentPlayerIndex >= this.players.length) this.currentPlayerIndex--;
  }

  updatePlayer(player: Player) {
    const index = this.players.findIndex((p) => p.id === player.id);
    this.players[index] = player;
  }

  changePlayerIndex(increment: number) {
    const newIndex = this.currentPlayerIndex + increment;
    this.currentPlayerIndex = newIndex;
    if (this.currentPlayerIndex >= this.players.length) this.currentPlayerIndex = 0;
    if (this.currentPlayerIndex < 0) this.currentPlayerIndex = this.players.length - 1;
  }

  reset() {
    this.players.forEach((p) => p.reset());
  }

  // TODO: Create a summary method to show basic info about the game?
  // Maybe: # or players, rounds completed, etc.
  summary() {
    return '';
  }
}
