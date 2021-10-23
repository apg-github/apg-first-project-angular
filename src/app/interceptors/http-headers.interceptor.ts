import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({

      setHeaders: {
        'x-rapidapi-key': 'esGbwrm390mshS2BCl0RALxQRtZTp1W7sFMjsnyJlJzDXVkW0H',
        'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
      },

      setParams: {
        key: 'c44d7c9ea1814a10a628bdcc8afef385'
      }

    });
    return next.handle(req);
  }
}
