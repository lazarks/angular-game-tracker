import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'game-other-games',
  templateUrl: './other-games.component.html',
  styleUrls: ['./other-games.component.scss'],
})
export class OtherGamesComponent implements OnInit {
  @Input() id!: string;
  sameSeriesGames!: Array<Game>;

  constructor(private httpService: HttpService, public router: Router) {
    // reload page
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.getOtherGames(this.id);
  }

  getOtherGames(id: string): void {
    this.httpService.getOtherGames(id).subscribe((response: any) => {
      this.sameSeriesGames = response.results;
    });
  }

  // another game overview
  openGameOverview(id: string): void {
    this.router.navigate(['overview', id]);
  }
}
