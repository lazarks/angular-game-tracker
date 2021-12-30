import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game.model';
import { Post } from 'src/app/models/post.model';
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
  redditPosts!: Array<Post>;

  slides: string[];
  slideConfig: Object;

  routeSub!: Subscription;
  gameSub!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    public router: Router
  ) {
    this.slideConfig = {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    this.slides = [];
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
      this.getOtherGames(this.gameId);
      this.getGameScreenshots(this.gameId);
      this.getRecentRedditPosts(this.gameId);
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
      });
  }

  getOtherGames(id: string): void {
    this.httpService.getOtherGames(id).subscribe((response: any) => {
      this.sameSeriesGames = response.results;
    });
  }

  getGameScreenshots(id: string): void {
    this.httpService.getScreenshots(id).subscribe((response: any) => {
      response.results.forEach((obj: any) => {
        this.slides.push(obj.image);
      });
    });
  }

  getRecentRedditPosts(id: string): void {
    this.httpService.getRedditPosts(id).subscribe((response: any) => {
      this.redditPosts = response.results;
    });
  }

  //other games func
  openGameOverview(id: string): void {
    this.router.navigate(['overview', id]);
  }

  goTo(url: string): void {
    window.location.href = url;
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  addSlide() {
    // this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  }

  removeSlide() {
    // this.slides.length = this.slides.length - 1;
  }

  slickInit(e: Object) {
    // console.log('slick initialized');
  }

  breakpoint(e: Object) {
    // console.log('breakpoint');
  }

  afterChange(e: Object) {
    // console.log('afterChange');
  }

  beforeChange(e: Object) {
    // console.log('beforeChange');
  }
}
