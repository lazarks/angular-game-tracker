import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { Library } from '../models/library.model';

@Injectable({
  providedIn: 'root',
})
export class LibService {
  private lib: Library = new Library();

  constructor() {
    let library = localStorage.getItem('library');
    if (library) {
      this.lib = JSON.parse(library);
    }
  }

  getLibrary(): Library {
    return this.lib;
  }

  // localStorage
  saveToLocalStorage(): void {
    let jsonLib = JSON.stringify(this.lib);
    localStorage.setItem('library', jsonLib);
  }

  saveGameToLibrary(game: Game): void {
    this.lib.savedGames.push(game);
    this.saveToLocalStorage();
  }

  removeFromLibrary(gameId: string): void {
    this.lib.savedGames = this.lib.savedGames.filter(
      (game) => game.id !== gameId
    );
    this.saveToLocalStorage();
  }

  // true if lib contains game with given id
  hasGame(gameId: string): boolean {
    return this.lib.savedGames.some((game) => game.id == gameId);
  }
}
