import {SearchBarModel} from './search-bar.model';
import {FiltersModel} from './filters.model';
import {GameDetailsModel} from './game-details.model';
import {Component} from './common/common.model';
import {GameCardModel} from "./game-card.model";

export class AppModel extends Component{
  private selector: JQuery.Selector = 'app-root';
  private games: JQuery.Selector = '.games';
  readonly searchBar: SearchBarModel;
  readonly filters: FiltersModel;
  readonly gameDetails: GameDetailsModel;

  constructor() {
    super('app-root');
    this.selector = 'app-root';
    this.searchBar = new SearchBarModel();
    this.filters = new FiltersModel();
    this.gameDetails = new GameDetailsModel();
  }

  appExists = () => {
    cy.get(this.selector).should('exist');
  }

  allComponentsExist = () => {
    this.appExists();
    this.searchBar.exists();
    this.filters.exists();
  }

  checkIfInitialGamesAreFetched = () => {
    cy
      .get(this.games).should('exist')
      .find('.game').should('have.length', 20); // we fetch 20 games initially
  }

  checkDetails = () => {
    cy
      .get('.game')
      .first()
      .click();
  }

  retrieveGameCardByName = (gameName: string) => {
    cy.get('.game-name').contains(gameName).parent().find('.game').should('exist');
    return new GameCardModel(gameName);
  }
}

export const app = new AppModel();
