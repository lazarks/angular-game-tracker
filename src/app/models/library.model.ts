import { Game } from './game.model';

export class Library {
  savedGames: Game[] = [];

  get gamesCount(): number {
    return this.savedGames.length;
  }
}
