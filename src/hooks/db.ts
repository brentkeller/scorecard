import { openDB, DBSchema } from 'idb';
import { Game, GameInfo } from '../games/Game';

interface MyDB extends DBSchema {
  games: {
    value: GameInfo;
    key: string;
    indexes: {
      'by-game-type': string;
      'by-date': Date;
    };
  };
}

export async function getDb() {
  const db = await openDB<MyDB>('my-db', 1, {
    upgrade(db) {
      const gameStore = db.createObjectStore('games', {
        keyPath: 'id',
      });
      gameStore.createIndex('by-game-type', 'type');
      gameStore.createIndex('by-date', 'date');
    },
  });

  return db;
}

export async function getGame<T extends Game>(id: string) {
  const db = await getDb();
  const result = await db.get('games', id);
  return (result?.game as T) ?? null;
}

export async function listGames() {
  const db = await getDb();
  const result = (await db.getAll('games')) ?? [];
  // sort by date descending
  return result.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function storeGame(game: Game) {
  const db = await getDb();
  return await db.put('games', {
    id: game.id,
    type: game.type,
    date: new Date(), // automatically set date to now to store modify date
    game,
  });
}
