import { Player } from './Player';

export type GameType = 'yahtzee' | 'basic';

export class Game<PlayerType extends Player> {
  id: string;
  type: GameType;
  date: Date;
  currentPlayerIndex: number;
  players: PlayerType[];

  constructor(id: string, type: GameType) {
    this.id = id;
    this.type = type;
    this.date = new Date();
    this.currentPlayerIndex = 0;
    this.players = [];
  }

  addPlayer(player: PlayerType) {
    if (!this.players) this.players = [];
    this.players.push(player);
  }

  removePlayer(player: PlayerType) {
    const index = this.players.findIndex((p) => p.id === player.id);
    this.players.splice(index, 1);
    this.currentPlayerIndex = 0;
    //if (this.currentPlayerIndex >= this.players.length) this.currentPlayerIndex--;
  }

  updatePlayer(player: PlayerType) {
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
}
