import ManufacturerPageObject from "../../../support/pages/module/sw-manufacturer.page-object";

describe('Manufacturer: Create a new one', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb().then(() => {
            return cy.loginViaApi();
        });
    });

    it('create new manufacturer', function () {
        const page = new ManufacturerPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/manufacturer/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-manufacturer'
        });
        cy.get(`${page.elements.smartBarHeader} > h2`).contains('Manufacturer');
        cy.get(page.elements.smartBarAmount).contains('1');
        cy.get(page.elements.primaryButton).contains('Add manufacturer').click();
        cy.url().should('contain', '#/sw/manufacturer/create');
        cy.get(`${page.elements.smartBarHeader} > h2`).contains('New manufacturer');

        cy.get('input[name=name]').clear().typeAndCheck('MAN-U-FACTURE');
        cy.get('input[name=link]').clear().typeAndCheck('https://google.com/doodles');
        cy.get(page.elements.manufacturerSave).click();
        cy.get('.icon--small-default-checkmark-line-medium').should('be.visible');

        cy.get(page.elements.smartBarBack).click();
        cy.get(page.elements.smartBarAmount).contains('2');
    });

    afterEach(function () {
        return cy.removeFixtureByName('MAN-U-FACTURE', 'product-manufacturer')
    });
});
