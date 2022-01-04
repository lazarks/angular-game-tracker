import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'game-screenshots',
  templateUrl: './screenshots.component.html',
  styleUrls: ['./screenshots.component.scss'],
})
export class ScreenshotsComponent implements OnInit {
  @Input() id!: string;

  slides: string[];
  slideConfig: Object;

  constructor(private httpService: HttpService) {
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
    this.getGameScreenshots(this.id);
  }

  getGameScreenshots(id: string): void {
    this.httpService.getScreenshots(id).subscribe((response: any) => {
      response.results.forEach((obj: any) => {
        this.slides.push(obj.image);
      });
    });
  }
}
