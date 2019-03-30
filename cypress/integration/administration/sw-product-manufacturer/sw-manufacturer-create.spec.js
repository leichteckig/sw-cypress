describe('Example for creating a manufacturer and doing some inline editing', function () {
    beforeEach(function () {
        cy.loginViaApi();
    });
    it('creat new manufacturer', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
        cy.get('.sw-admin-menu__flyout-item--sw-manufacturer').click();
        cy.get('.smart-bar__header > h2').contains('Manufacturer');
        cy.get('.sw-page__smart-bar-amount').contains('1');
        cy.get('.sw-button--primary').contains('Add manufacturer').click();
        cy.url().should('contain', '#/sw/manufacturer/create');
        cy.get('.smart-bar__header > h2').contains('New manufacturer');

        cy.get('input[name=name]').clear().typeAndCheck('MAN-U-FACTURE');
        cy.get('input[name=link]').clear().typeAndCheck('https://google.com/doodles');
        cy.get('.sw-manufacturer-detail__save-action').click();
        cy.get('.sw-alert').should('be.visible');
        cy.get('.sw-alert__close').click();

        cy.get('.smart-bar__back-btn').click();
        cy.get('.sw-page__smart-bar-amount').contains('2');
    });
    afterEach(function () {
        return cy.removeFixtureByName('MAN-U-FACTURE', 'product-manufacturer')
    });
});
