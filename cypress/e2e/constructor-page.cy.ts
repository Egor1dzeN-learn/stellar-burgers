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
const burger_ingredient = `[data-cy=burger_ingredient]`;
const burger_ingredient_btn = `[data-cy=burger_ingredient] > button`;
const burger_ingredient_nth_btn = `[data-cy=burger_ingredient]:nth-of-type(3) > button`;
const burger_constructor_empty_top = `[data-cy=burger_constructor_empty_top]`;
const burger_constructor_empty_middle = `[data-cy=burger_constructor_empty_middle]`;
const burger_constructor_empty_down = `[data-cy=burger_constructor_empty_down]`;
const modal = `[data-cy=modal]`;
const modal_overlay = `[data-cy=modal_overlay]`;
const burger_constructor_element = `[data-cy=burger_constructor_element]`;
const constructor_bun_up = `[data-cy=constructor-bun-up]`;
const constructor_bun_down = `[data-cy=constructor-bun-down]`;
const burger_ingredient_title = `[data-cy=burger-ingredient-title]`;
const modal_close_button = `[data-cy=modal_close_button]`;
const burger_constructor_submit = `[data-cy=burger_constructor_submit]`;
const order_details_order_number = `[data-cy=order_details_order_number]`;
it('should constructor is empty', () => {
  cy.get(burger_constructor_empty_top).should('exist');
  cy.get(burger_constructor_empty_middle).should('exist');
  cy.get(burger_constructor_empty_down).should('exist');
  cy.get(burger_constructor_element).should('not.exist');
});
describe('test modal windows', () => {
  it('should open window for viewing the ingredient', () => {
    cy.get(burger_ingredient).first().should('exist').click();
    cy.get(modal).should('be.visible');
    cy.get(burger_ingredient_title).should('contain', 'Краторная булка N-200i');
    cy.get(modal_overlay).should('exist').click({ force: true });
    cy.get(modal).should('not.exist');
    cy.get(modal_overlay).should('not.exist');
  });
  it('should close window for viewing the ingredient', () => {
    cy.get(modal).should('not.exist');
    cy.get(modal_overlay).should('not.exist');
    cy.get(burger_ingredient).first().should('exist').click();
    cy.get(modal).should('be.visible');
    cy.get(modal_close_button).click();
  });
});
it('should create an order', () => {
  cy.get(burger_ingredient_btn).first().should('exist').click();
  cy.get(burger_ingredient_nth_btn).first().should('exist').click();
  cy.get(constructor_bun_up).should('contain', 'Краторная булка N-200i (верх)');
  cy.get(constructor_bun_down).should(
    'contain',
    'Краторная булка N-200i (низ)'
  );
  cy.get(`[data-cy=constructor-ingredient-643d69a5c3f7b9001cfa093f]`).should(
    'exist'
  );
  cy.intercept('POST', 'api/orders', { fixture: 'order' }).as('order');
  cy.get(burger_constructor_submit).should('exist').click();
  cy.wait('@order');

  cy.fixture('order').then((newOrder) => {
    cy.get(order_details_order_number).contains(newOrder.order.number);
  });
});
it('should add ingredients to burger', () => {
  cy.get(burger_constructor_empty_top).should('exist');
  cy.get(burger_constructor_empty_middle).should('exist');
  cy.get(burger_constructor_empty_down).should('exist');
  cy.get(burger_constructor_element).should('not.exist');

  cy.get(burger_ingredient_btn).first().should('exist').click();
  cy.get(burger_ingredient_nth_btn).first().should('exist').click();

  cy.get(constructor_bun_up).should('exist');
  cy.get(constructor_bun_down).should('exist');
  cy.get(burger_constructor_element).should('exist');
});
