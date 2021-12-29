import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Game, Genre, Platform } from '../models/game.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search: string,
    genres?: Array<string>,
    platform?: number
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (genres && genres.length != 0) {
      params = params.set('genres', genres.toString());
    }

    if (search) {
      params = params
        .set('search_precise', true)
        .set('search_exact', true)
        .set('search', search);
      // params = new HttpParams().set('search', search).set('ordering', ordering);
    }
    if (platform) {
      params = params.set('platforms', platform);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGenresList(): Observable<APIResponse<Genre>> {
    return this.http.get<APIResponse<Genre>>(`${env.BASE_URL}/genres`);
  }
  getParentPlatformList(): Observable<APIResponse<Platform>> {
    return this.http.get<APIResponse<Platform>>(
      `${env.BASE_URL}/platforms/lists/parents`
    );
  }

  getGameDetails(id: string): any {
    return this.http.get(`${env.BASE_URL}/games/${id}`);
  }

  getOtherGames(id: string): any {
    return this.http.get(`${env.BASE_URL}/games/${id}/game-series`);
  }
}
