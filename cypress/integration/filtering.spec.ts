import {app} from '../models/app.model';
import {FilterValues} from '../models/filters.model';

describe('Filters tests', () => {
  beforeEach(() => cy.visit('/'));

  it('apply all filters', () => {
    app.filters.exists();
    app.filters.filter(FilterValues.METACRITIC);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
    app.filters.filter(FilterValues.RATING);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
    app.filters.filter(FilterValues.UPDATED);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
    app.filters.filter(FilterValues.ADDED);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
    app.filters.filter(FilterValues.RELEASED);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
    app.filters.filter(FilterValues.NAME);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
  });

  it('clear filters', () => {
    app.filters.exists();
    app.filters.filter(FilterValues.NAME);
    cy.get('.ngx-spinner-overlay').should('exist');
    cy.get('.ngx-spinner-overlay').should('not.exist');
    app.filters.clearFilters();
    cy.get('.ngx-spinner-overlay').should('not.exist');
  });
});
