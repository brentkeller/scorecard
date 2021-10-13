import { Player } from '../Player';
import { calculateScores } from './yahtzeeCalculator';

export class YahtzeePlayerScores {
  ones?: number;
  twos?: number;
  threes?: number;
  fours?: number;
  fives?: number;
  sixes?: number;
  numbersTotal?: number;
  numbersBonus?: number;
  upperTotal?: number;
  threeOfAKind?: number;
  fourOfAKind?: number;
  fullHouse?: number;
  smallStraight?: number;
  largeStraight?: number;
  yahtzee?: number;
  chance?: number;
  yahtzeeBonus1?: number;
  yahtzeeBonus2?: number;
  yahtzeeBonus3?: number;
  yahtzeeBonus4?: number;
  lowerTotal?: number;
  total?: number;
  [key: string]: number | undefined; // Index signature
}

export interface YahtzeePlayerData {
  id: string;
  name: string;
  scores: YahtzeePlayerScores;
}

export class YahtzeePlayer extends Player {
  scores: YahtzeePlayerScores;

  constructor(name: string) {
    super(name);
    this.scores = new YahtzeePlayerScores();
  }

  updateScore(fieldName: string, value?: number) {
    const scores = { ...this.scores };
    // Only update bonuses if yahtzee has been filled
    if (
      !this.scores.yahtzee &&
      ['yahtzeeBonus1', 'yahtzeeBonus2', 'yahtzeeBonus3', 'yahtzeeBonus4'].includes(fieldName)
    )
      return;
    scores[fieldName] = value;
    this.scores = calculateScores(scores);
  }

  reset() {
    this.scores = new YahtzeePlayerScores();
  }

  static fromData(p: YahtzeePlayerData) {
    const newPlayer = new this(p.name);
    newPlayer.id = p.id;
    newPlayer.scores = p.scores;
    return newPlayer;
  }
}
