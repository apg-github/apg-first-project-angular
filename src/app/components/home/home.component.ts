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
      this.gameSub = this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
        if (params['game-search']) {
          this.searchGames('metacrit', params['game-search']);
        } else {
          this.searchGames('metacrit');
        }
      });
  }

  searchGames(sort: string, search?: string): void {
    this.spinner.show();
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        console.log(gameList.results);
        this.games = gameList.results;
      });
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
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
