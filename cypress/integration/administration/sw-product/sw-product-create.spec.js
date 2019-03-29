describe('Product: Create product with image', function () {
    beforeEach(function () {
        return cy.loginViaApi().then(() => {
            return cy.createDefaultFixture('category')
        })
    });
    it('creates a product with an image', function () {
        cy.server();
        cy.route('/api/v1/media/*').as('saveMedia');
        cy.route('/api/v1/product').as('saveProduct');

        cy.get('.sw-admin-menu__navigation-list-item.sw-product span.collapsible-text')
            .contains('Products');
        cy.get('a.sw-admin-menu__navigation-link[href="#/sw/product/index"]').first().click();
        cy.get('a[href="#/sw/product/create"]').click();
        cy.get('input[name=sw-field--product-name]').typeAndCheck('Product with file upload image');
        cy.get('.ql-editor').type('My very first description').contains('My very first description');
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
        cy.get('input[name=sw-field--url]').type('http://localhost:8000/bundles/administration/static/fixtures/sw-login-background.png');
        cy.get('.sw-media-url-form__submit-button').click();
        cy.awaitAndCheckNotification('File has been saved successfully.');
        cy.get('.sw-media-preview__item').invoke('attr', 'src').should('contain', 'sw-login-background');

        cy.get('.sw-product-detail__save-action').click();
        cy.get('.sw-loader').should('not.exist');
        cy.awaitAndCheckNotification('Product "Product with file upload image" has been saved successfully.');

        cy.get('a.smart-bar__back-btn').click();
        cy.get('.sw-data-grid__row--0').reload();
        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name').contains('Product with file upload image');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('Product with file upload image');
        cy.get('.sw-data-grid__row--0 .sw-data-grid__cell--name').contains('Product with file upload image');
        cy.get('.sw-page__smart-bar-amount').contains('(1)');
    });
    afterEach(function () {
        return cy.removeFixtureByName('MainCategory', 'category').then(() => {
            return cy.removeFixtureByName('Product with file upload image', 'product')
        }).then(() => {
            return cy.removeFixtureByName('sw-login-background', 'media', {
                identifier: 'fileName'
            })
        })
    });
});
