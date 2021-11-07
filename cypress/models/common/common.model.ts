class Component {
  private selector: JQuery.Selector;

  exists = () => {
    cy.get(this.selector).should('exist');
  }
}
