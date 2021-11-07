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
  routeSub: Subscription;
  gameSub: Subscription;

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
