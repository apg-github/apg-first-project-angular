import {SearchBarModel} from './search-bar.model';
import {FiltersModel} from './filters.model';
import {GameDetailsModel} from './game-details.model';

export class AppModel {
  private selector: JQuery.Selector = 'app-root';
  private games: JQuery.Selector = '.games';
  private searchBar: SearchBarModel;
  private filters: FiltersModel;
  private gameDetails: GameDetailsModel;

  constructor() {
    this.searchBar = new SearchBarModel();
    this.filters = new FiltersModel();
    this.gameDetails = new GameDetailsModel();
  }

  appExists =  () => {
    cy.get(this.selector).should('exist');
  }

  allComponentsExist =  () => {
     this.appExists();
     this.searchBar.exists();
     this.filters.exists();
  }

  checkIfInitialGamesAreFetched = () => {
    cy
      .get(this.games).should('exist')
      .find('.game').should('have.length', 20); // we fetched 20 games initially
  }

  checkDetails = () => {
    cy
      .get('.game')
      .first()
      .click();
  }
}

export const app = new AppModel();
