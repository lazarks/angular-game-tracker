import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game, Genre } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  public lastSearch!: string;
  public sort: string = '-added';
  public games!: Array<Game>;
  public genres!: Array<Genre>;

  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames(this.sort, params['game-search']);
      } else {
        this.searchGames(this.sort);
      }
    });
    this.getGenres();
  }

  searchGames(sort: string, search?: string): void {
    if (search) {
      this.lastSearch = search;
    }
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  getGenres(): void {
    this.httpService.getGenresList().subscribe((list: APIResponse<Genre>) => {
      this.genres = list.results;
      console.log(list);
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
