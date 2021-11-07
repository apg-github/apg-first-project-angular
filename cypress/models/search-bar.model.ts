import {Component} from './common/common.model';

export class SearchBarModel extends Component {
  private selector: JQuery.Selector;
  private searchInput: JQuery.Selector = '.search-input';
  private searchButton: JQuery.Selector = '.search-button';
  private home: JQuery.Selector = '.logo';

  constructor() {
    super('.search-container');
    this.selector = '.search-container';
  }

  search = (text: string) => {
    cy
      .get(this.searchInput).type(text)
      .get(this.searchButton).click();
  }

  clickHome = () => {
    cy.get(this.home).click();
  }

  exists = () => {
    cy.get(this.selector).should('exist');
  }
}

export const searchBar = new SearchBarModel();
