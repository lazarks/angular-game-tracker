import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Game, Genre } from '../models/game.model';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    ordering: string,
    search?: string,
    genres?: Array<string>
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (genres && genres.length != 0) {
      params = params.set('genres', genres.toString());
    }

    if (search) {
      params = params.set('search', search);
      // params = new HttpParams().set('search', search).set('ordering', ordering);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGenresList(): Observable<APIResponse<Genre>> {
    return this.http.get<APIResponse<Genre>>(`${env.BASE_URL}/genres`);
  }
}
