/// <reference types="cypress" />

context('Main tests', () => {

    it('Header exists', () => {
        cy.visit("http://localhost:3000/");

        cy.get('header').should('exist');
        cy.get('header').should('be.visible');
    })

    it('Footer exists', () => {
        cy.get('footer').should('exist');
        cy.get('footer').should('be.visible');
    });

    it('Input exists', () => {
        cy.get('input[type="text"]').should('exist');
        cy.get('input[type="text"]').should('be.visible');
    });

    it('Div with words exist', () => {
        cy.get('#divMainWords').should('exist');
        cy.get('#divMainWords').should('be.visible');
    });

    it ('Div with words has words in it', () => {
        cy.get('#divMainWords').find('span').should('have.lengthOf.at.least', 2);
        cy.get('#divMainWords').should('be.visible');
    });

    it('Results div should have "0 WPM"', () => {
        cy.get('#divResults').should('have.text', '0 WPM');
        cy.get('#divResults').should('be.visible');
    });

    it('Clicking the Reset button should reset component state', () => {
        cy.get('input[type="text"]').type('test');
        cy.get('button').click();
        cy.get('input[type="text"]').should('have.value', '');
    })
});