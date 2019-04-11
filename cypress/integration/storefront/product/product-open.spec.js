describe('Product: Open product page', function () {

  beforeEach(() => {
    cy.fixture('product').as('product');
  });

    it('check if product is visible', function () {

        cy.visit(this.product.url);

        cy.get('.product-detail-name').contains(this.product.name);
        cy.get('.product-detail-price').contains(this.product.price.gross);
    });
});
