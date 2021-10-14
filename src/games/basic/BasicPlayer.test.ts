import { BasicPlayer } from './BasicPlayer';

describe('updateScore', () => {
  let player: BasicPlayer;
  beforeEach(() => (player = new BasicPlayer('Me')));

  test('should add new round', () => {
    player.updateScore(1, 10);
    expect(player.turns).toHaveLength(1);
    expect(player.turns[0].score).toBe(10);
  });

  test('should update existing round', () => {
    player.updateScore(1, 10);
    player.updateScore(1, 16);
    expect(player.turns).toHaveLength(1);
    expect(player.turns[0].score).toBe(16);
  });

  test('should sort turns', () => {
    player.updateScore(2, 10);
    player.updateScore(1, 16);
    expect(player.turns).toHaveLength(2);
    expect(player.turns[0].round).toBe(1);
    expect(player.turns[1].round).toBe(2);
  });

  test('should calculate totals for each turn', () => {
    player.updateScore(1, 16);
    player.updateScore(2, 10);
    expect(player.turns[0].total).toBe(16);
    expect(player.turns[1].total).toBe(26);
  });
});

test('total should return total of latest turn or zero', () => {
  const player = new BasicPlayer('Me');
  expect(player.total()).toBe(0);
  player.updateScore(1, 16);
  expect(player.total()).toBe(16);
  player.updateScore(2, 10);
  expect(player.total()).toBe(26);
});
