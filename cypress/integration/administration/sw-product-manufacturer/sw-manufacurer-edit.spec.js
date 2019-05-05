import ManufacturerPageObject from "../../../support/pages/module/sw-manufacturer.page-object";

let mediaUploaded = false;

describe('Manufacturer: Edit in various ways', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.loginViaApi().then(() => {
            return cy.createDefaultFixture('product-manufacturer')
        })
    });

    it('edit manufacturer\'s base data', function () {
        const page = new ManufacturerPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/manufacturer/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-manufacturer'
        });
        cy.get(`${page.elements.smartBarHeader} > h2`).contains('Manufacturer');
        cy.get(page.elements.smartBarAmount).contains('2');

        cy.get(`${page.elements.gridRow}--0 a`).click();
        cy.get('input[name=name]').clear().typeAndCheck('What does it means?(TM)');
        cy.get('input[name=link]').clear().typeAndCheck('https://google.com/doodles');
        cy.get(page.elements.manufacturerSave).click();
        cy.get('.icon--small-default-checkmark-line-medium').should('be.visible');

        cy.get(page.elements.smartBarBack).click();
        cy.reload();
        cy.get(page.elements.smartBarAmount).contains('2');
        cy.get(`${page.elements.gridRow}--1 a`).click();
        cy.get('input[name=name]').clear().typeAndCheck('MAN-U-FACTURE');
        cy.get(page.elements.manufacturerSave).click();
        cy.get('.icon--small-default-checkmark-line-medium').should('be.visible');
    });

    it('upload manufacturer logo', function () {
        const page = new ManufacturerPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/manufacturer/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-manufacturer'
        });

        cy.get('.sw-grid-row:nth-of-type(1) > .sw-grid-column:nth-of-type(5) .sw-context-button').click();
        cy.get('.sw-context-menu-item').first().click();
        cy.get('.sw-media-upload__switch-mode').click();
        cy.get('input[name=sw-field--url]').clear().typeAndCheck(`${Cypress.config('baseUrl')}/bundles/administration/static/fixtures/sw-login-background.png`);
        cy.get('.sw-media-url-form__submit-button').click();
        mediaUploaded = true;

        cy.awaitAndCheckNotification('A file has been saved successfully.');
        cy.get('.sw-media-preview__item').invoke('attr', 'src').should('contain', 'sw-login-background');
        cy.get(page.elements.manufacturerSave).click();
        cy.get('.icon--small-default-checkmark-line-medium').should('be.visible');
    });

    afterEach(function () {
        return cy.removeFixtureByName('MAN-U-FACTURE', 'product-manufacturer').then(() => {
            if(!mediaUploaded) {
                return Promise.resolve();
            }
            return cy.removeFixtureByName('sw-login-background', 'media', {
                identifier: 'fileName',
            });
        })
    });
});
