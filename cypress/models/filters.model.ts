export class FiltersModel {
  private selector: JQuery.Selector = '.filters';

  exists = () => {
    cy.get(this.selector).should('exist');
  }
}

export const filters = new FiltersModel();
