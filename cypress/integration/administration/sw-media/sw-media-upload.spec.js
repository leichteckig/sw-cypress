import MediaPageObject from "../../../support/pages/module/sw-media.page-object";

describe('Media: Create item via uploading image', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.loginViaApi();
    });

    it('upload image and check metadata', function () {
        const page = new MediaPageObject();

        cy.get('.sw-admin-menu__navigation-list-item.sw-media span.collapsible-text')
            .contains('Media');
        cy.get('a.sw-admin-menu__navigation-link[href="#/sw/media/index"]').click();
        cy.clickContextMenuItem(
            '.sw-media-upload__button-url-upload',
            '.sw-media-upload__button-context-menu'
        );

        page.uploadImageUsingUrl(`${Cypress.config('baseUrl')}/bundles/administration/static/img/sw-login-background.png`);

        cy.get('.sw-media-preview__item').first().should('be.visible').click();

        cy.get('.sw-media-quickinfo-metadata-mimeType').should('be.visible');
        cy.get('.sw-media-quickinfo-metadata-mimeType').contains('image/png');
        cy.get('.sw-media-quickinfo-metadata-size').contains('501.38KB');
        cy.get('.sw-media-quickinfo-metadata-file-type').contains('PNG');
        cy.get('.sw-media-quickinfo-metadata-name input').invoke('val').should('eq', 'sw-login-background');
    });

    afterEach(function () {
        return cy.removeFixtureByName('sw-login-background', 'media', {
            identifier: 'fileName'
        });
    });
});
