import {app} from '../models/app.model';

describe('Components visibility', () => {
  beforeEach(() => cy.visit('/'));

  it('checks if components are loaded properly', () => {
    app.allComponentsExist();
  });

  it('checks if initial games are fetched', () => {
    app.checkIfInitialGamesAreFetched();
  });

  it('checks if details component is working', () => {
    app.checkDetails();
  });
});
