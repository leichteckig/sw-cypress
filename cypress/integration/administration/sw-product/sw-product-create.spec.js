import ProductPageObject from "../../../support/pages/module/sw-product.page-object";

describe('Product: Create with image', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.loginViaApi().then(() => {
            return cy.createDefaultFixture('category')
        })
    });

    it('creates a product with an image', function () {
        const page = new ProductPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/product/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-product'
        });
        cy.get('a[href="#/sw/product/create"]').click();
        cy.get('input[name=sw-field--product-name]').typeAndCheck('Product with file upload image');
        cy.get('.sw-select-product__select_manufacturer').typeSwSelectAndCheck(
            'shopware AG',
            {
                searchTerm: 'shopware AG',
                isMulti: false,
                clearField: false
            });
        cy.get('.sw-product-detail__select-category').typeSwSelectAndCheck(
            'MainCategory',
            {
                searchTerm: 'MainCategory',
                isMulti: true,
                clearField: false
            });
        cy.get('select[name=sw-field--product-taxId]').select('19%');
        cy.get('input[name=sw-field--price-gross]').typeAndCheck('99');
        cy.get('input[name=sw-field--product-stock]').typeAndCheck('100');

        cy.get('.sw-media-upload__switch-mode').click();
        cy.get('input[name=sw-field--url]').type(`${Cypress.config('baseUrl')}/bundles/administration/static/fixtures/sw-login-background.png`);
        cy.get('.sw-media-url-form__submit-button').click();
        cy.awaitAndCheckNotification('A file has been saved successfully.');

        cy.get('.sw-media-preview__item').invoke('attr', 'src').should('contain', 'sw-login-background');
        cy.get(page.elements.productSaveAction).click();
        cy.get(page.elements.loader).should('not.exist');
        cy.get('.icon--small-default-checkmark-line-medium').should('be.visible');
        cy.get(page.elements.smartBarBack).click();
        cy.get(`${page.elements.dataGridRow}--0`).reload();
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name`).contains('Product with file upload image');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('Product with file upload image');
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name`).contains('Product with file upload image');
        cy.get(page.elements.smartBarAmount).contains('(1)');
    });

    afterEach(function () {
        return cy.removeFixtureByName('MainCategory', 'category').then(() => {
            return cy.removeFixtureByName('Product with file upload image', 'product');
        }).then(() => {
            return cy.removeFixtureByName('sw-login-background', 'media', {
                identifier: 'fileName'
            });
        })
    });
});
