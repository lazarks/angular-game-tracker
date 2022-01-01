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
    this.saveToLocalStorage();
  }

  removeFromLibrary(gameId: string): void {
    this.lib.savedGames = this.lib.savedGames.filter(
      (game) => game.id !== gameId
    );
    this.saveToLocalStorage();
  }

  hasGame(gameId: string): boolean {
    let x = this.lib.savedGames.some((game) => game.id == gameId);
    return x;
  }

  getLibrary(): Library {
    return this.lib;
  }

  saveToLocalStorage(): void {
    let jsonLib = JSON.stringify(this.lib);
    localStorage.setItem('library', jsonLib);
  }

  constructor() {
    let library = localStorage.getItem('library');
    if (library) {
      this.lib = JSON.parse(library);
    }
  }
}
