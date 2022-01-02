import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.scss'],
})
export class RecommendedComponent implements OnInit {
  slides!: Game[];
  slideConfig: Object;

  constructor(private httpService: HttpService, private router: Router) {
    this.slideConfig = {
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      dots: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 800, settings: { slidesToShow: 1 } },
      ],
      autoplay: true,
      autoplaySpeed: 3000,
    };
  }

  ngOnInit(): void {
    this.slides = [];
    this.getGameDetails('415171');
    this.getGameDetails('3272');
    this.getGameDetails('3439');
    this.getGameDetails('290856');
    this.getGameDetails('23598');
  }

  getGameDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe((response: Game) => {
      let temp = response.description_raw;
      let newDesc = temp.substring(
        0,
        temp.indexOf('.', temp.indexOf('.') + 1) + 1
      );
      response.description_raw = newDesc; // first 2 sentences

      this.slides.push(response);
    });
  }

  openGameOverview(id: string): void {
    this.router.navigate(['overview', id]);
  }
}
