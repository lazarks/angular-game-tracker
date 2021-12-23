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
  public genres!: Array<Genre>;
  public selectedGenres!: Array<string>;
  public games!: Array<Game>;

  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {
    this.selectedGenres = new Array<string>();
  }

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
      .getGameList(sort, search, this.selectedGenres)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  addGenre(event: Event): void {
    if ((<HTMLInputElement>event.target).checked) {
      this.selectedGenres.push((<HTMLInputElement>event.target).value);
    } else {
      this.selectedGenres.forEach((genre, index) => {
        if (genre == (<HTMLInputElement>event.target).value) {
          this.selectedGenres.splice(index, 1);
        }
      });
    }
    this.searchGames(this.sort);
  }

  getGenres(): void {
    this.httpService.getGenresList().subscribe((list: APIResponse<Genre>) => {
      this.genres = list.results;
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
