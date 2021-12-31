import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Library } from 'src/app/models/library.model';
import { LibService } from 'src/app/services/lib.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {
  library!: Library;

  constructor(private libService: LibService) {
    this.setLibrary();
  }

  setLibrary(): void {
    this.library = this.libService.getLibrary();
  }

  unsave(game: Game) {
    this.libService.removeFromLibrary(game.id);
    this.setLibrary();
  }

  ngOnInit(): void {}
}
