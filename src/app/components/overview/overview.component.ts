import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { Library } from 'src/app/models/library.model';
import { HttpService } from 'src/app/services/http.service';
import { LibService } from 'src/app/services/lib.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  gameId!: string;
  game!: Game;
  library: Library;

  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private libService: LibService
  ) {
    this.library = libService.getLibrary();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    });
  }

  // http
  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
      });
  }

  // bookmark icon functionality
  // save/remove game from library
  saveGame() {
    if (this.isSaved()) {
      this.libService.removeFromLibrary(this.game.id);
    } else {
      this.libService.saveGameToLibrary(this.game);
    }
  }
  isSaved(): boolean {
    return this.libService.hasGame(this.gameId);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
