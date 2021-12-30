import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
  gameId!: string;
  game!: Game;
  sameSeriesGames!: Array<Game>;

  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
      this.getOtherGames(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        // api bug, some games have rating > rating_top
        if (gameResp.rating > gameResp.rating_top) {
          gameResp.rating_top += 1; //
        }
        this.game = gameResp;
        // console.log(gameResp);
      });
  }

  getOtherGames(id: string): void {
    this.httpService.getOtherGames(id).subscribe((response: any) => {
      this.sameSeriesGames = response.results;
      console.log(this.sameSeriesGames);
    });
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
