export class Component {
  // tslint:disable-next-line:variable-name
   private _selector: JQuery.Selector;

   constructor(selector: JQuery.Selector) {
     this._selector = selector;
   }

  exists = () => {
    cy.get(this._selector).should('exist');
  }
}
