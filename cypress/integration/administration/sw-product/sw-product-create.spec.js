import ProductPageObject from "../../../support/pages/module/sw-product.page-object";

describe('Product: Create with image', () => {
    beforeEach(() => {
        cy.setLocaleToEnGb().then(() => {
            return cy.loginViaApi();
        }).then(() => {
            return cy.createDefaultFixture('category');
        }).then(() => {
            cy.visit('/admin');
        });
    });

    it('creates a product with an image', () => {
        const page = new ProductPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/product/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-product'
        });
        cy.get('a[href="#/sw/product/create"]').click();
        cy.get('input[name=sw-field--product-name]').typeAndCheck('Product with file upload image');
        cy.get('select[name=sw-field--product-taxId]').select('Standard rate');
        cy.get('#sw-price-field-gross').typeAndCheck('99');
        cy.get('input[name=sw-field--product-stock]').typeAndCheck('100');

        cy.get(page.elements.productSaveAction).click();
        cy.get(page.elements.loader).should('not.exist');
        cy.get(page.elements.successIcon).should('be.visible');
        cy.get(page.elements.smartBarBack).click();
        cy.reloadListing();
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name`).contains('Product with file upload image');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('Product with file upload image');
        cy.get(`${page.elements.dataGridRow}--0 .sw-data-grid__cell--name`).contains('Product with file upload image');
    });

    afterEach(() => {
        return cy.removeFixtureByName('MainCategory', 'category').then(() => {
            return cy.removeFixtureByName('Product with file upload image', 'product');
        });
    });
});
