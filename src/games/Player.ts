import { v4 as uuid } from 'uuid';

export class Player {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }

  reset() {
    throw new Error('Subclass must override reset');
  }
}
