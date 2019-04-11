describe('Product: Open product page', function () {
  this.product = {};
  beforeEach(() => {
    cy.fixture('product').as('product');
  });

    it('check if product is visible', function () {
        cy.getRandomProductInformationForCheckout().then((product) => {
            cy.visit(product.url);

            cy.get('.product-detail-name').contains(product.name);
            cy.get('.product-detail-price').contains(product.price);
        })
    });

    it('searches product in search bar', function () {
        cy.getRandomProductInformationForCheckout().then((product) => {
            cy.visit('/');

            cy.get('input[type="search"]').type(product.name);

            cy.get('ul.search-suggest-container .result-link:first').click()

            cy.url().should('contain', product.url);
            cy.get('.product-detail-name').contains(product.name);
        });
    });
});
