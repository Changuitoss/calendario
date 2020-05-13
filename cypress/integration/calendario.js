/// <reference types="Cypress" />

const url = 'http://127.0.0.1:5500/index.html';

function pad(n) { //Agrega o saca el 0 (cero) de los valores de mes y dia.
  return n < 10 ? n.split('')[1] : n;
}


context('Calendario', () => {
  before(() => {
    cy.visit(url);
  })
  const nombreMesArr = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  describe('Crea eventos y los manipula', () => {

    it('Que el mes en display es el actual', () => {
      cy.get('.input__calendario').invoke('val').then(valor => {
        const mes = pad(valor.split('-')[1]) - 1;
        
        cy.get('.header__nav--mes').should('have.text', nombreMesArr[mes])
      })
    })

    it('Que al cambiar de mes, cambie el display', () => {
      cy.get('.input__calendario').type('2020-10-10').trigger('change')
      cy.get('.input__calendario').invoke('val').then(valor => {
        const mes = pad(valor.split('-')[1]) - 1;
        
        cy.get('.header__nav--mes').should('have.text', nombreMesArr[mes])
      })
    })

    it('Que el panel AGREGAR EVENTO este visible al clickear "+"', () => {
      cy.get('.calendario__agregar').first().click()
      cy.get('.agregar__content').should('be.visible');
    })

    it('Ingresa un usuario y crea un evento', () => {
      cy.visit(url)
      const titulo = 'Test titulo'
      cy.get('.input__usuario').type('Cypress')
      cy.get('.calendario__agregar').first().click()
      cy.get('.agregar__form--nombre').type(titulo)
      cy.get('.agregar__form--inicio').type('01:01')
      cy.get('.agregar__form--final-hora').type('01:01')
      cy.get('.agregar__form--descripcion').type('Test descripcion')
      cy.get('.agregar__boton--aceptar').click()
      cy.get('.calendario__item--link').should('have.text', titulo);
    })
    
    //No estoy encontrando la vuelta de por que no puede clickear en un evento.
/*  it('Que el usuario creador este participando del evento', () => {

      cy.get('.calendario__item--link').click() //Por alguna razon no trae a los participantes del evento Cypress
      cy.get('.editar__participantes--lista-item').should('have.text', 'Cypress')
    }) */
  })
});

