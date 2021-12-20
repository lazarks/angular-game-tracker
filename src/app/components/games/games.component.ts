import { Component, OnInit } from '@angular/core';
import { APIResponse, Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  public games!: Array<Game>;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getGameList().subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);
    });
  }
}
