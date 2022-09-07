/// <reference types="Cypress" />

describe('Cypress Studio Demo', () => {

    it('create new transaction', () => {

      /* ==== Generated with Cypress Studio ==== */
      cy.visit('https://ac.windtre.it');
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('#login_entra').click();
      cy.get('.mat-form-field-infix').click();
      cy.get('#firstInput').clear();
      cy.get('#firstInput').type('minopica@gmail.com');
      cy.get('#login_continua').click();
      cy.get('form.ng-untouched > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
      cy.get('#mat-input-1').clear();
      cy.get('#mat-input-1').type('a12345678B');
      cy.get('#accedi').click();
      cy.get('#Tariffe\\ estero > .w3-link').click();
      cy.get('#roaming_ue > .details-card > .row > .col-9 > .sub-title').click();
      cy.get('#Tariffe\\ estero > .w3-link').click();
      cy.get('#quando_sei_all_estero > .details-card > .row > .col-9 > .title').click();
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('#login_entra').click();
      cy.get('.mat-form-field-infix').click();
      cy.get('#firstInput').clear();
      cy.get('#firstInput').type('minopica@gmail.com');
      cy.get('#login_continua').click();
      cy.get('form.ng-untouched > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click();
      cy.get('#mat-input-1').clear();
      cy.get('#mat-input-1').type('a12345678B');
      cy.get('#accedi').click();
      cy.get('#Tariffe\\ estero > .w3-link').click();
      cy.get('#roaming_ue > .details-card > .row > .col-9 > .sub-title').click();
      cy.get('#Tariffe\\ estero > .w3-link').click();
      cy.get('#quando_sei_all_estero > .details-card > .row > .col-9 > .title').click();
      /* ==== End Cypress Studio ==== */
    })
  })
  