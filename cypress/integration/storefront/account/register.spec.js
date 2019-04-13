describe('Register: Open register form', function () {

    it('check if register form is present', function () {
        cy.visit('/account/login');
        cy.get('.register-form').should('be.visible');
    });

    it('trigger validation error', function () {
        cy.visit('/account/login');

        cy.get('[name="email"]:invalid').should('be.visible');
        cy.get('.register-submit [type="submit"]').click();
    });

    it('fill form', function () {
        cy.visit('/account/login');

        cy.get('select[name="salutationId"]').select('Mx.');
        cy.get('input[name="title"]').type('Prof. Dr.');
        cy.get('input[name="firstName"]').type('John');
        cy.get('input[name="lastName"]').type('Doe');

        cy.get('select[name="birthdayDay"]').select('4');
        cy.get('select[name="birthdayMonth"]').select('8');
        cy.get('select[name="birthdayYear"]').select('1917');

        cy.get('.register-form input[name="email"]').type('john+'+Math.random() * 100+'@example.com');
        cy.get('.register-form input[name="password"]').type('1234567890');

        cy.get('input[name="billingAddress[street]"]').type('123 Main St');
        cy.get('input[name="billingAddress[zipcode]"]').type('9876');
        cy.get('input[name="billingAddress[city]"]').type('Anytown');
        cy.get('select[name="billingAddress[countryId]"]').select('USA');

        cy.get('.register-submit [type="submit"]').click();

        cy.url().should('not.include', '/register');
        cy.url().should('include', '/account');

        cy.get('.account-welcome h1').should((element) => {
            expect(element).to.contain('Prof. Dr.');
        });
    });
});
