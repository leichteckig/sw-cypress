import MediaPageObject from "../../../support/pages/module/sw-media.page-object";

describe('Media: Create item via uploading image', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb().then(() => {
            return cy.loginViaApi();
        });
    });

    it('upload image and check metadata', function () {
        const page = new MediaPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/media/index',
            mainMenuId: 'sw-content',
            subMenuId: 'sw-media'
        });
        cy.clickContextMenuItem(
            '.sw-media-upload__button-url-upload',
            '.sw-media-upload__button-context-menu'
        );

        page.uploadImageUsingUrl(`${Cypress.config('baseUrl')}/bundles/administration/static/img/sw-login-background.png`);

        cy.get('.sw-media-base-item__name[title="sw-login-background.png"]').should('be.visible').click();

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
