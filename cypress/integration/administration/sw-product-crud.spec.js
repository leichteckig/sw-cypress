describe('Product example with image upload', function () {
    beforeEach(function () {
        return cy.loginViaApi().then(() => {
            return cy.createViaAdminApi({
                endpoint: 'category',
                data: {
                    name: 'MainCategory'
                }
            })
        }).then((result) => {
            return cy.log(result.status)
        })
    });
    it('creates a product with an image (file upload)', function () {
        cy.server();
        cy.route('/api/v1/media/*').as('saveMedia');
        cy.route('/api/v1/product/*').as('saveProduct');

        cy.get('.sw-admin-menu__navigation-list-item.sw-product span.collapsible-text')
            .contains('Products');
       /* cy.get('a.sw-admin-menu__navigation-link[href="#/sw/product/index"]').first().click();
        cy.get('a[href="#/sw/product/create"]').click();
        cy.get('input[name=sw-field--product-name]').typeAndCheck('Product with file uplod image');
        cy.get('.ql-editor').type('My very first description').contains('My very first description');
        cy.get('select[name=sw-field--product-manufacturerId]').select('shopware AG');
        cy.get('.sw-product-detail__select-category').select('Default catalogue');
        cy.get('select[name=sw-field--product-taxId]').select('19%');
        cy.get('input[name=sw-field--price-gross]').typeAndCheck('99');

        cy.upload_file('input.sw-media-upload__file-input','sw-login-background.png','image/png');

        cy.get('.sw-product-detail__save-action').click();
        cy.wait(['@saveMedia']).then((xhr) => {
            // TODO check for file name present or something like that
            // assert.isNotNull(xhr.response.body.data, '1st API call has data')
        });
        cy.reload();
        cy.get('.sw-media-preview__item').invoke('attr', 'src').should('contain','sw-login-background');*/
    });
    afterEach(function () {
        return cy.removeFixtureByName('MainCategory', 'category').then((result) => {
            return cy.log(result)
        })
    });
});
