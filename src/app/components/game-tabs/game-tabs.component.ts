import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../interface-models';

@Component({
  selector: 'app-game-tabs',
  templateUrl: './game-tabs.component.html',
  styleUrls: ['./game-tabs.component.scss']
})
export class GameTabsComponent implements OnInit, OnDestroy {
  @Input() game: Game;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }


}
