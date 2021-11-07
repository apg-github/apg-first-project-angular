import {Component, OnDestroy, OnInit} from '@angular/core';
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

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show().then(() => {
      this.gameSub = this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['game-search']) {
          this.searchGames('metacrit', params['game-search']);
        } else {
          this.searchGames('metacrit');
        }
      });
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  searchGames(sort: string, search?: string): void {
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  clearFilters(): void {
    this.sort = null;
    this.searchGames('metacrit');
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
