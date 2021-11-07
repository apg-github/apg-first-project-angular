export class SearchBarModel {
 private selector: JQuery.Selector = '.search-container';

 exists = () => {
   cy.get(this.selector).should('exist');
 }
}

export const searchBar = new SearchBarModel();
