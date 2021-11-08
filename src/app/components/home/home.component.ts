import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {APIResponse, Game} from '../../interface-models';
import {HttpService} from '../../services/http.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string;
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  private params: Params;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
  }

  public gamesHaveNextPage: boolean;
  public pageCounter: number;
  private searchFromUrl: Params;

  ngOnInit(): void {
    this.gameSub = this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.params = params;
      if (params['game-search']) {
        this.searchGames(this.sort, this.params);
      } else {
        this.searchGames(this.sort);
      }
    });
  }

  searchGames(sort = this.sort, search = this.params): void {
    this.spinner.show();
    this.gamesHaveNextPage = false;
    this.pageCounter = 1;

    this.httpService
      .getGameList(this.sort, search['game-search'])
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        if (gameList.next) {
          this.gamesHaveNextPage = true;
          this.pageCounter++;
        }
      });

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  fetchMoreGames(pageCounter = this.pageCounter, sort = this.sort, search = this.params): void {
    this.spinner.show();
    this.gamesHaveNextPage = false;
    this.httpService
      .getGameList(this.sort, search['game-search'], this.pageCounter)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games.push(...gameList.results);

        if (gameList.next) {
          this.gamesHaveNextPage = true;
          this.pageCounter++;
        }

        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      });
  }

  clearFilters(): void {
    this.sort = undefined;
    this.searchGames(undefined, this.params);
  }

  openGameDetails(gameId: string): void {
    this.spinner.show();
    this.router.navigate(['details', gameId]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
