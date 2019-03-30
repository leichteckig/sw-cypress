describe('Example for creating a manufacturer and doing some inline editing', function () {
    beforeEach(function () {
        return cy.loginViaApi().then(() => {
            return cy.createDefaultFixture('product-manufacturer')
        })
    });
    it('edit manufacturer\'s base data', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
        cy.get('.sw-admin-menu__flyout-item--sw-manufacturer').click();
        cy.get('.smart-bar__header > h2').contains('Manufacturer');
        cy.get('.sw-page__smart-bar-amount').contains('2');

        cy.get('.sw-grid__row--0 a').click();
        cy.get('input[name=name]').clear().typeAndCheck('MAN-U-FACTURE');
        cy.get('input[name=link]').clear().typeAndCheck('https://google.com/doodles');
        cy.get('.sw-manufacturer-detail__save-action').click();
        cy.get('.sw-alert').should('be.visible');
        cy.get('.sw-alert__close').click();

        cy.get('.smart-bar__back-btn').click();
        cy.get('.sw-page__smart-bar-amount').contains('2');
    });
    /*it('do inline editing', function () {
        cy.server();
        cy.route('/api/v1/*').as('waitApi');

        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
        cy.get('.sw-admin-menu__flyout-list > .sw-manufacturer-index > .sw-admin-menu__navigation-link').click();
        cy.get('.sw-grid-row:nth-of-type(1) > .sw-grid-column:nth-of-type(3)').dblclick();
        cy.get('input[name=sw-field--item-name]').clear().typeAndCheck('Sepenja');
        cy.get('.sw-grid-row__actions > button').eq(1).click().wait('@waitApi');
    });
    it('upload and remove manufacturer logo', function () {
        cy.server();
        cy.route('/api/v1/*').as('waitApi');

        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
        cy.get('.sw-admin-menu__flyout-list > .sw-manufacturer-index > .sw-admin-menu__navigation-link').click();

        cy.get('.sw-grid-row:nth-of-type(1) > .sw-grid-column:nth-of-type(5) .sw-context-button').click();
        cy.get('.sw-context-menu-item').first().click();
        cy.get('.sw-media-upload__switch-mode').click();
        cy.get('input[name=sw-field--url]').clear().typeAndCheck('http://localhost/bundles/administration/static/fixtures/sw-login-background.png');
        cy.get('.sw-modal__footer .sw-button--primary').click().wait('@waitApi');
        cy.get('.sw-alert').should('be.visible');
        cy.get('.sw-alert__close').click();

        cy.get('.sw-media-preview__item').should('be.visible');
        cy.get('.sw-manufacturer-detail__save-action').click();
        cy.get('.sw-alert').should('be.visible');
        cy.get('.sw-alert__close').click();
        cy.get('.smart-bar__back-btn').click();

        cy.get('.sw-grid-row:nth-of-type(1) > .sw-grid-column:nth-of-type(5) .sw-context-button').click();
        cy.get('.sw-context-menu-item').first().click();
        cy.get('.sw-media-preview__item').should('be.visible');
        cy.get('.sw-manufacturer-detail__delete-logo').click();
        cy.get('.sw-manufacturer-detail__save-action').click();
    });*/
    afterEach(function () {
        return cy.removeFixtureByName('MAN-U-FACTURE', 'product-manufacturer')
    });
});
