beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'mockedRefreshToken');
  cy.setCookie('accessToken', 'mockedAccessToken');

  cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
  cy.visit('/');
  cy.wait('@getUser');
});
afterEach(() => {
  cy.clearAllLocalStorage();
  cy.clearAllCookies();
});
it('should constructor is empty', () => {
  cy.get(`[data-cy=burger_constructor_empty_top]`).should('exist');
  cy.get(`[data-cy=burger_constructor_empty_middle]`).should('exist');
  cy.get(`[data-cy=burger_constructor_empty_down]`).should('exist');
  cy.get(`[data-cy=burger_constructor_element]`).should('not.exist');
});
describe('test modal windows', () => {
  it('should open window for viewing the ingredient', () => {
    cy.get(`[data-cy=burger_ingredient]`).first().should('exist').click();
    cy.get(`[data-cy=modal]`).should('be.visible');
    cy.get(`[data-cy=modal_overlay]`).should('exist').click({ force: true });
    cy.get(`[data-cy=modal]`).should('not.exist');
    cy.get(`[data-cy=modal_overlay]`).should('not.exist');
  });
  it('should close window for viewing the ingredient', () => {
    cy.get(`[data-cy=modal]`).should('not.exist');
    cy.get(`[data-cy=modal_overlay]`).should('not.exist');
    cy.get(`[data-cy=burger_ingredient]`).first().should('exist').click();
    cy.get(`[data-cy=modal]`).should('be.visible');
    cy.get(`[data-cy=modal_close_button]`).click();
  });
});
it('should create an order', () => {
  cy.get(`[data-cy=burger_ingredient] > button`)
    .first()
    .should('exist')
    .click();
  cy.get(`[data-cy=burger_ingredient]:nth-of-type(3) > button`)
    .first()
    .should('exist')
    .click();
  cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('order');
  cy.get(`[data-cy=burger_constructor_submit]`).should('exist').click();
  cy.wait('@order');

  cy.fixture('order').then((newOrder) => {
    cy.get(`[data-cy=order_details_order_number]`).contains(
      newOrder.order.number
    );
  });
});
