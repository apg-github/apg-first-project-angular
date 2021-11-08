import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../interface-models';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../../services/http.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string;
  game: Game;
  /*  game: Game = {
      id: 0,
      background_image: 'loading',
      name: 'loading',
      released: 'loading',
      metacritic_url: 'loading',
      website: 'loading',
      description: 'loading',
      metacritic: 0,
      genres: [{name: 'loading'}],
      parent_platforms: [{platform: {name: 'loading', slug: 'loading'}}],
      publishers: [{name: 'loading'}],
      ratings: [{id: 0, count: 0, title: 'loading'}],
      screenshots: [{image: 'loading'}],
      trailers: [{data: {max: 'loading'}}],
    };*/
  routeSub: Subscription;
  gameSub: Subscription;
  isDataAvailable = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.spinner.show();

    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['game-id'];
      this.getGameDetails(this.gameId);
    });

    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResponse: Game) => {
        if (gameResponse !== undefined) {
          this.game = gameResponse;
        }
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
        this.isDataAvailable = true;
      });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
