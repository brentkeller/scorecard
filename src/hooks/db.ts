import { openDB, DBSchema } from 'idb';
import { Game, GameType } from '../games/Game';

interface MyDB extends DBSchema {
  games: {
    value: {
      id: string;
      type: GameType;
      date: Date;
      game: Game;
    };
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

export async function storeGame(game: Game) {
  const db = await getDb();
  return await db.put('games', {
    id: game.id,
    type: game.type,
    date: new Date(), // automatically set date to now to store modify date
    game,
  });
}
