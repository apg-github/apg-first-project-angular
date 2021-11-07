import {Component} from './common/common.model';

export enum FilterValues {
  NAME = 'Name',
  RELEASED = 'Released',
  ADDED = 'Added',
  UPDATED = 'Updated',
  RATING = 'Rating',
  METACRITIC = 'Metacritic'
}

export class FiltersModel extends Component {
  private selector: JQuery.Selector;
  private filtersSelect = 'mat-form-field';
  private clearFiltersBtn = 'button';

  constructor() {
    super('.filters');
    this.selector = '.filters';
  }

  filter(filter: FilterValues): void {
    cy.get(this.selector).find(this.filtersSelect).click();
    cy.get('.mat-option-text').contains(filter).click();
  }

  clearFilters(): void {
    cy.get(this.selector).find(this.clearFiltersBtn).click();
  }

}

export const filters = new FiltersModel();
