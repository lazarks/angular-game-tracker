import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game, Genre, Platform } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';
import { LibService } from 'src/app/services/lib.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit, OnDestroy {
  public lastSearch!: string;
  public sort: string = '-added';
  public platforms: Array<Platform>;
  public selectedPlatform!: number;
  public genres!: Array<Genre>;
  public selectedGenres!: Array<string>;

  public games!: Array<Game>;

  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private libService: LibService
  ) {
    this.selectedGenres = new Array<string>();
    this.platforms = new Array<Platform>();
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
    this.getPlatforms();
  }

  searchGames(sort: string, search?: string): void {
    if (search) {
      this.lastSearch = search;
    }

    this.gameSub = this.httpService
      .getGameList(
        sort,
        this.lastSearch,
        this.selectedGenres,
        this.selectedPlatform
      )
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  searchByPlatform(event: Event): void {
    if ((<HTMLInputElement>event.target).checked) {
      this.selectedPlatform = +(<HTMLInputElement>event.target).value;
    }
    this.searchGames(this.sort);
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

  // http

  getGenres(): void {
    this.httpService.getGenresList().subscribe((list: APIResponse<Genre>) => {
      this.genres = list.results;
    });
  }

  getPlatforms(): void {
    this.httpService
      .getParentPlatformList()
      .subscribe((list: APIResponse<Platform>) => {
        list.results.forEach((item) => {
          if (item.id < 9) {
            this.platforms.push(item);
          }
        });
      });
  }

  // save/remove game to/from library
  saveGame(game: Game, event: Event) {
    // prevent opening game overview when clicking on bookmark
    event.preventDefault();
    event.stopPropagation();

    if (this.isSaved(game)) {
      this.libService.removeFromLibrary(game.id);
    } else {
      this.libService.saveGameToLibrary(game);
    }
  }

  isSaved(game: Game): boolean {
    return this.libService.hasGame(game.id);
  }

  openGameOverview(id: string): void {
    this.router.navigate(['overview', id]);
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
