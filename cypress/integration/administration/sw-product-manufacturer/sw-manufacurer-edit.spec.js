describe('Edit a manufacturer in various ways', function () {
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
        cy.get('input[name=name]').clear().typeAndCheck('What does it means?(TM)');
        cy.get('input[name=link]').clear().typeAndCheck('https://google.com/doodles');
        cy.get('.sw-manufacturer-detail__save-action').click();
        cy.awaitAndCheckNotification('Manufacturer "What does it means?(TM)" has been saved successfully.');

        cy.get('.smart-bar__back-btn').click();
        cy.reload();
        cy.get('.sw-page__smart-bar-amount').contains('2');
        cy.get('.sw-grid__row--1 a').click();
        cy.get('input[name=name]').clear().typeAndCheck('MAN-U-FACTURE');
        cy.get('.sw-manufacturer-detail__save-action').click();
        cy.get('.sw-alert').should('be.visible');
    });
    it('upload manufacturer logo', function () {
        cy.get('.sw-admin-menu__navigation-list-item.sw-product').trigger('mouseover');
        cy.get('.sw-admin-menu__flyout-item--sw-manufacturer').click();

        cy.get('.sw-grid-row:nth-of-type(1) > .sw-grid-column:nth-of-type(5) .sw-context-button').click();
        cy.get('.sw-context-menu-item').first().click();
        cy.get('.sw-media-upload__switch-mode').click();
        cy.get('input[name=sw-field--url]').clear().typeAndCheck('http://localhost/bundles/administration/static/fixtures/sw-login-background.png');
        cy.get('.sw-media-url-form__submit-button').click();
        cy.awaitAndCheckNotification('File has been saved successfully.');
        cy.get('.sw-media-preview__item').invoke('attr', 'src').should('contain', 'sw-login-background');
        Cypress.env('updatedSecondTime', true);

        cy.get('.sw-media-preview__item').should('be.visible');
        cy.get('.sw-manufacturer-detail__save-action').click();
        cy.awaitAndCheckNotification('Manufacturer "MAN-U-FACTURE" has been saved successfully.');
        cy.get('.smart-bar__back-btn').click();

        cy.get('.sw-grid-row:nth-of-type(1) > .sw-grid-column:nth-of-type(5) .sw-context-button').click();
        cy.get('.sw-context-menu-item').first().click();
        cy.get('.sw-media-preview__item').should('be.visible');
    });
    afterEach(function () {
        return cy.removeFixtureByName('MAN-U-FACTURE', 'product-manufacturer').then(() => {
            if (Cypress.env('updatedSecondTime')) {
                return cy.removeFixtureByName('sw-login-background', 'media', {
                    identifier: 'fileName',
                    fixtureFlag: 'updatedSecondTime'
                });
            }
            return Promise.resolve();
        })
    });
});
