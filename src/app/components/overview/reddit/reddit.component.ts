import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-reddit',
  templateUrl: './reddit.component.html',
  styleUrls: ['./reddit.component.scss'],
})
export class RedditComponent implements OnInit {
  @Input() id!: string;
  posts: Array<Post>;

  constructor(private httpService: HttpService) {
    this.posts = new Array<Post>();
  }

  ngOnInit(): void {
    this.getRecentRedditPosts(this.id);
  }

  // goto reddit link
  goTo(url: string): void {
    window.open(url, '_blank');
  }

  // http
  getRecentRedditPosts(id: string): void {
    this.httpService.getRedditPosts(id).subscribe((response: any) => {
      this.posts = response.results;
    });
  }
}
