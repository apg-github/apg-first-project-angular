export class GameCardModel {
  private readonly gameName: string;

  constructor(gameName: string) {
    this.gameName = gameName;
  }

  openDetails = () => {
    cy.get('.game-name').contains(this.gameName).closest('.game').click();
  }

  checkIfDetailsAreOpened = () => {
    cy.get('.details').should('exist');
    cy.get('game-header-title').contains(this.gameName).should('exist');
  }

  exists = () => {
    cy.get('.game-name').contains(this.gameName);
  }
}
