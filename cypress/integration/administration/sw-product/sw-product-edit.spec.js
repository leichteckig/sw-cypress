describe('Product: Edit product in various ways', function () {
    beforeEach(function () {
        return cy.loginViaApi().then(() => {
            return cy.createProductFixture('product', {
                manufacturerName: 'shopware AG',
                taxName: '19%'
            })
        })
    });
    it('edit a product\'s base data', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product span.collapsible-text')
            .contains('Products');
        cy.get('a.sw-admin-menu__navigation-link[href="#/sw/product/index"]').first().click();
        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name a').click();
        cy.get('input[name=sw-field--product-name]').clear().type('What remains of Edith Finch');
        cy.get('input[name=sw-field--product-active]').tickAndCheckCheckbox(false);
        cy.get('.sw-product-detail__save-action').click();
        cy.get('.sw-loader').should('not.exist');
        cy.awaitAndCheckNotification('Product "What remains of Edith Finch" has been saved successfully.');
        Cypress.env('updated', true);

        cy.get('a.smart-bar__back-btn').click();
        cy.get('.sw-data-grid__row--0').reload();
        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name').contains('What remains of Edith Finch');
        cy.get('.sw-data-grid__row--0 .is--inactive').should('be.visible');

        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name a').click();
        cy.get('input[name=sw-field--product-name]').clear().type('Product name');

        cy.get('.sw-product-detail__save-action').click();
        cy.get('.sw-loader').should('not.exist');
        cy.awaitAndCheckNotification('Product "Product name" has been saved successfully.');
    });
    it('edit a product\'s translation', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product span.collapsible-text')
            .contains('Products');
        cy.get('a.sw-admin-menu__navigation-link[href="#/sw/product/index"]').first().click();
        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name a').click();

        cy.get('.sw-language-switch').click();
        cy.get('.sw-field__select-load-placeholder').should('not.exist');

        cy.get('.sw-select-option:nth-of-type(1)').contains('Deutsch').click();
        cy.get('.sw-field__select-load-placeholder').should('not.exist');
        cy.get('.sw-loader').should('not.exist');
        cy.get('.sw-language-info span').contains('"Product name" displayed in the root language "Deutsch".');
        cy.get('input[name=sw-field--product-name]').typeAndCheck('Sauerkraut');

        cy.get('.sw-product-detail__save-action').click();
        cy.get('.sw-loader').should('not.exist');
        cy.awaitAndCheckNotification('Product "Sauerkraut" has been saved successfully.');
        Cypress.env('updated', true);

        cy.get('a.smart-bar__back-btn').click();
        cy.get('.sw-data-grid__row--0').reload();
        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name').contains('Sauerkraut');
    });
    afterEach(function () {
        return cy.removeFixtureByName('Product name', 'product')
    });
});
