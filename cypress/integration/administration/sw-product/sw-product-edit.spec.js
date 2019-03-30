import ProductPageObject from "../../../support/pages/module/sw-product.page-object";

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
        const page = new ProductPageObject();

        cy.get(`${page.elements.adminMenu}__navigation-list-item.sw-product span.collapsible-text`)
            .contains('Products');
        cy.get(`a${page.elements.adminMenu}__navigation-link[href="#/sw/product/index"]`).first().click();
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name a`).click();
        cy.get('input[name=sw-field--product-name]').clear().type('What remains of Edith Finch');
        cy.get('input[name=sw-field--product-active]').tickAndCheckCheckbox(false);
        cy.get(page.elements.productSaveAction).click();
        cy.get(page.elements.loader).should('not.exist');
        cy.awaitAndCheckNotification('Product "What remains of Edith Finch" has been saved successfully.');

        cy.get(page.elements.smartBarBack).click();
        cy.get(`${page.elements.dataGridRow}--0`).reload();
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name`).contains('What remains of Edith Finch');
        cy.get(`${page.elements.dataGridRow}--0 .is--inactive`).should('be.visible');

        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name a`).click();
        cy.get('input[name=sw-field--product-name]').clear().type('Product name');

        cy.get(page.elements.productSaveAction).click();
        cy.get(page.elements.loader).should('not.exist');
        cy.awaitAndCheckNotification('Product "Product name" has been saved successfully.');
    });
    it('edit a product\'s translation', function () {
        const page = new ProductPageObject();

        cy.get(`${page.elements.adminMenu}__navigation-list-item.sw-product span.collapsible-text`)
            .contains('Products');
        cy.get(`a${page.elements.adminMenu}__navigation-link[href="#/sw/product/index"]`).first().click();
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name a`).click();

        cy.get('.sw-language-switch').click();
        cy.get('.sw-field__select-load-placeholder').should('not.exist');

        cy.get('.sw-select-option:nth-of-type(1)').contains('Deutsch').click();
        cy.get('.sw-field__select-load-placeholder').should('not.exist');
        cy.get(page.elements.loader).should('not.exist');
        cy.get('.sw-language-info span').contains('"Product name" displayed in the root language "Deutsch".');
        cy.get('input[name=sw-field--product-name]').typeAndCheck('Sauerkraut');

        cy.get(page.elements.productSaveAction).click();
        cy.awaitAndCheckNotification('Product "Sauerkraut" has been saved successfully.');
        cy.get(page.elements.loader).should('not.exist');

        cy.get(page.elements.smartBarBack).click();
        cy.get(`${page.elements.dataGridRow}--0`).reload();
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name`).contains('Sauerkraut');
    });
    afterEach(function () {
        return cy.removeFixtureByName('Product name', 'product')
    });
});
