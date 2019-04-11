import ManufacturerPageObject from "../../../support/pages/module/sw-manufacturer.page-object";

describe('Manufacturer: Delete in various ways', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.loginViaApi().then(() => {
            return cy.createDefaultFixture('product-manufacturer')
        })
    });

    it('delete manufacturer via context menu', function () {
        const page = new ManufacturerPageObject();

        cy.get(`${page.elements.adminMenu}__navigation-list-item.sw-product`).trigger('mouseover');
        cy.get(`${page.elements.adminMenu}__flyout-item--sw-manufacturer`).click();
        cy.get(`${page.elements.smartBarHeader} > h2`).contains('Manufacturer');
        cy.get(page.elements.smartBarAmount).contains('2');
        cy.clickContextMenuItem(
            '.sw-context-menu-item--danger',
            page.elements.contextMenuButton,
            `${page.elements.gridRow}--0`
        );
        cy.get(page.elements.modal).should('be.visible');
        cy.get(`${page.elements.modal} ${page.elements.modal}__body p`).contains(
            'Are you sure you want to delete the manufacturer "MAN-U-FACTURE"?'
        );
        cy.get(`${page.elements.modal}__footer ${page.elements.primaryButton}`).click();
        cy.get(page.elements.modal).should('not.exist');
        cy.get(page.elements.smartBarAmount).contains('1');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('MAN-U-FACTURE');
        cy.get(page.elements.smartBarAmount).contains('0');
    });
});
