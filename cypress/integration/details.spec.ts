import {app} from '../models/app.model';

describe('Game Details tests', () => {
  beforeEach(() => cy.visit('/'));

  it('open details of specific game', () => {
    const gameName = 'Gwent';
    app.searchBar.exists();
    app.searchBar.search(gameName);
    const card = app.retrieveGameCardByName(gameName);
    card.exists();
    card.openDetails();
    card.checkIfDetailsAreOpened();
  });

  it('check all game details tabs', () => {
    cy.visit('/details/3498'); // Grand Theft Auto 5 url
  });
});
