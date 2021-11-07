import {Component} from './common/common.model';

type Tabs = 'About' | 'Screenshots' | 'Trailers';

export class GameDetailsModel extends Component{
  private selector: JQuery.Selector;

  constructor() {
    super('.details');
    this.selector = '.details';
  }

  changeTab = (tab: Tabs) => {
    cy.get('.mat-tab-label-content').contains(tab).click();
  }

}

export const gameDetails = new GameDetailsModel();
