let product = {};

describe('Home: Open home page', function () {

    beforeEach(function () {
        cy.setLocaleToEnGb();
        return cy.getRandomProductInformationForCheckout().then((result) => {
            product = result;
        })
    });

    it('run checkout with random product as new customer', function () {
        // Registration
        cy.visit('/account/login');
        cy.get('select[name="salutationId"]').select('Mx.');
        cy.get('input[name="title"]').type('Prof. Dr.');
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');

        cy.get('select[name="birthdayDay"]').select('4');
        cy.get('select[name="birthdayMonth"]').select('8');
        cy.get('select[name="birthdayYear"]').select('1917');

        cy.get('.register-form input[name="email"]').type('john-doe-for-testing@example.com');
        cy.get('.register-form input[name="password"]').type('1234567890');

        cy.get('input[name="billingAddress[street]"]').type('123 Main St');
        cy.get('input[name="billingAddress[zipcode]"]').type('9876');
        cy.get('input[name="billingAddress[city]"]').type('Anytown');
        cy.get('select[name="billingAddress[countryId]"]').select('USA');
        cy.get('.register-form .register-submit .btn-primary').click();

        // Product detail
        cy.visit(product.url);
        cy.get('.buy-widget-submit').click();

        // Off canvas
        cy.get('.js-off-canvas.is-open').should('be.visible');
        cy.get('.cart-item-link-name').contains(product.name);
        cy.get('.cart-item-link-price').contains(product.gross);
        cy.get('.cart-prices-subtotal').contains(product.gross);

        // Checkout
        cy.get('.cart-actions .btn-light').click();
        cy.get('.cart-item-total-price').contains(product.gross);
        cy.get('.checkout-summary-total .checkout-summary-value').contains(product.gross);
        cy.get('.checkout-main-right .btn-primary').click();

        // Confirm
        cy.get('.confirm-terms .card-title').contains('Terms, conditions and cancellation policy');
        cy.get('.cart-item-details-container .cart-item-label').contains(product.name);
        cy.get('.cart-item-product .cart-item-total-price').contains(product.gross);
        cy.get('.checkout-summary-total .checkout-summary-value').contains(product.gross);

        /*
        * You can continue to checkout from here, if you want to. Just uncomment the following lines.
        * cy.get('#sAGB').check();
        * cy.get('#confirmFormSubmit').click();
        * cy.get('.finish-header').contains('Thank you for your order with Shopware Storefront!');
        */
    });
    after(function () {
        return cy.removeFixtureByName('john-doe-for-testing@example.com', 'customer', {
            identifier: 'email'
        })
    });
});
