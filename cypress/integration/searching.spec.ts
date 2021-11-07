import {app} from '../models/app.model';

describe('Searching tests', () => {
  beforeEach(() => cy.visit('/'));

  it('search for specific game', () => {
    const gameName = 'Terracotta';
    app.searchBar.search(gameName);
    app.retrieveGameCardByName(gameName).exists();
  });

  it('clicking home clears search input', () => {
    app.searchBar.search('Terracotta');
    app.searchBar.clickHome();
    cy.get('.search-input').invoke('val').should('be.empty');
  });
});
