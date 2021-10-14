import { Player } from '../Player';

export interface BasicRoundData {
  round: number;
  score?: number;
  total?: number;
}

export class BasicPlayer extends Player {
  turns: BasicRoundData[];

  constructor(name: string) {
    super(name);
    this.turns = [];
  }

  updateScore(round: number, value?: number) {
    let turn = this.turns.find((x) => x.round === round);
    if (!turn) {
      turn = { round };
      this.turns.push(turn);
    }
    turn.score = value;
    this.calculateScore();
  }

  calculateScore() {
    // order turns by round number
    this.turns.sort((a, b) => a.round - b.round);
    // iterate and sum, updating total for each turn
    let total = 0;
    this.turns.forEach((turn) => {
      total += turn.score ?? 0;
      turn.total = total;
    });
  }

  total() {
    return this.turns.slice(-1)[0]?.total ?? 0;
  }

  reset() {
    this.turns = [];
  }

  static fromData(p: BasicPlayer) {
    const newPlayer = new this(p.name);
    newPlayer.id = p.id;
    newPlayer.turns = p.turns;
    return newPlayer;
  }
}
