import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {environment as env} from '../../environments/environment';
import {APIResponse, Game} from '../interface-models';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getGameList(
    ordering: string,
    search?: string,
    pageCounter?: number
  ): Observable<APIResponse<Game>> {
    const paramObj = {
      ordering: undefined,
      search: undefined,
      page: undefined
    };

    if (ordering !== undefined) {
      paramObj.ordering = ordering;
    }

    if (search !== undefined) {
      paramObj.search = search;
    }

    if (pageCounter) {
      paramObj.page = pageCounter;
    }

    let params = new HttpParams();

    Object.keys(paramObj).forEach(key => {
      if (paramObj[key] !== undefined) {
        params = params.set(key, paramObj[key]);
      }
    });

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp.gameInfoRequest,
          screenshots: resp.gameScreenshotsRequest?.results,
          trailers: resp.gameTrailersRequest?.results,
        };
      })
    );
  }
}
