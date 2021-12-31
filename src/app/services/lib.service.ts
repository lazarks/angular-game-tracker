import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Library } from '../models/library.model';

@Injectable({
  providedIn: 'root',
})
export class LibService {
  private lib: Library = new Library();

  saveGameToLibrary(game: Game): void {
    this.lib.savedGames.push(game);
  }

  removeFromLibrary(gameId: string): void {
    this.lib.savedGames = this.lib.savedGames.filter(
      (game) => game.id !== gameId
    );
  }

  hasGame(gameId: string): boolean {
    let x = this.lib.savedGames.some((game) => game.id == gameId);
    return x;
  }

  getLibrary(): Library {
    return this.lib;
  }

  constructor() {}
}
