import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Game } from '../models/game.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(): Observable<APIResponse<Game>> {
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`);
  }
}
