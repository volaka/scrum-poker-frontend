/* eslint-disable no-undef */
describe('Add Story Test', () => {
  it('should open add story page.', () => {
    cy.visit('/poker-planning-add-story-list');
  });
  it('should show error messages for fields.', () => {
    cy.visit('/poker-planning-add-story-list');
    cy.contains('Start Session').click();
    cy.contains('Name cannot be empty.').should('be.exist');
    cy.contains('Voter count cannot be empty.').should('be.exist');
    cy.contains('Story List cannot be empty.').should('be.exist');
  });
  it('should print error if name field\'s length is bigger then 200 characters', () => {
    let name = '';
    for (let i = 0; i < 34; i++) {
      name += 'Sprint';
    }
    cy.visit('/poker-planning-add-story-list');
    cy.get('[name="name"]').type(name);
    cy.contains('Name cannot be more than 200 characters.').should('be.exist');
  });
  it('should print error to input 0 for field voter count.', () => {
    cy.visit('/poker-planning-add-story-list');
    cy.get('[name="voter"]').type('0');
    cy.contains('Voter count cannot be 0 (zero).').should('be.exist');
  });
  it('should print error to negative inputs for field voter count.', () => {
    cy.visit('/poker-planning-add-story-list');
    cy.get('[name="voter"]').type('-1');
    cy.contains('Voter count cannot be negative.').should('be.exist');
    cy.get('[name="voter"]').clear().type('-100');
    cy.contains('Voter count cannot be negative.').should('be.exist');
    cy.get('[name="voter"]').clear().type('-12345678');
    cy.contains('Voter count cannot be negative.').should('be.exist');
  });
  it('should removes error messages when appropriate input is typed.', () => {
    cy.visit('/poker-planning-add-story-list');
    cy.contains('Start Session').click();
    cy.get('[name="name"]').type('Sprint 1');
    cy.get('[name="voter"]').type('1');
    cy.get('[name="storyList"]').type('Story 1');
    cy.get('.ui.form.error ').should('not.exist');
  });
});
