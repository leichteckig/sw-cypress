import ProductPageObject from "../../../support/pages/module/sw-product.page-object";

describe('Product: Delete in various ways', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.loginViaApi().then(() => {
            return cy.createProductFixture('product', {
                manufacturerName: 'shopware AG',
                taxName: '19%'
            })
        })
    });

    it('delete using context menu action', function () {
        const page = new ProductPageObject();

        cy.clickMainMenuItem({
            targetPath: '#/sw/product/index',
            mainMenuId: 'sw-catalogue',
            subMenuId: 'sw-product'
        });
        cy.clickContextMenuItem(
            '.sw-context-menu-item--danger',
            page.elements.contextMenuButton,
            `${page.elements.dataGridRow}--0`
        );
        cy.get(page.elements.modal).should('be.visible');
        cy.get(`${page.elements.modal} .sw-product-list__confirm-delete-text`).contains(
            'Are you sure you really want to delete the product "Product name"?'
        );
        cy.get(`${page.elements.modal}__footer ${page.elements.primaryButton}`).click();

        cy.get(page.elements.modal).should('not.exist');
        cy.get(page.elements.emptyState).should('be.visible');
        cy.get(page.elements.smartBarAmount).contains('(0)');
        cy.get('input.sw-search-bar__input').typeAndCheckSearchField('Product name');
        cy.get(page.elements.smartBarAmount).contains('(0)');
    });
});
