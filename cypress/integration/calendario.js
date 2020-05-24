/// <reference types="Cypress" />

const url = 'http://127.0.0.1:8080/index.html';

function pad(n) { //Agrega o saca el 0 (cero) de los valores de mes y dia.
  return n < 10 ? n.split('')[1] : n;
}

function pad1(n) { //Agrega o saca el 0 (cero) de los valores de mes y dia.
  return n < 10 ? '0' + n : n;
}


context('Calendario', () => {
  before(() => {
    cy.visit(url);
  })

  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  
  afterEach(() => {
    cy.saveLocalStorage();
  });

  const nombreMesArr = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  describe('Crea eventos y los manipula', () => {

    it('Que el mes en display sea el actual', () => {
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

    it('Que hayan 35 celdas en el calendario', () => {
      cy.get('.calendario__dia').should('have.length', 35);
    })

    it('Que al ocultar los fines de semana, desaparezcan las celdas', () => {
      cy.get('.input__weekend-check').uncheck()
      cy.get('.calendario__hidden').should('have.length', 10);
      cy.get('.input__weekend-check').check()
    })

    it('Que muestre error si no se ingresa un usuario al crear evento', () => {
      cy.get('.calendario__agregar').first().click()
      cy.get('.input__usuario-warning').should('be.visible');
    })

    it('Ingresa un usuario, crea un evento y lo chequea', () => {
      cy.visit(url)
      const titulo = 'Test titulo';

      cy.get('.input__usuario').type('Cypress')
      cy.get('.calendario__agregar').first().click()
      cy.get('.agregar__form--nombre').type(titulo)
      cy.get('.agregar__form--inicio').type('01:01')
      cy.get('.agregar__form--final-hora').type('01:01')
      cy.get('.agregar__form--descripcion').type('Test descripcion')
      cy.get('.agregar__boton--aceptar').click()
      cy.get('.calendario__item--link').should('have.text', `01:01\u00A0\u00A0${titulo}`)
    })

    it ('Edita titulo y fecha final, chequea que se hagan los cambios', () => {
      const titulo = 'Test editado';

      cy.get('.input__calendario').invoke('val')
        .then(valor => {
          const fecha = new Date(valor);
          const pasadoManana = `${fecha.getFullYear()}-${pad1(fecha.getMonth() + 1)}-${pad1(fecha.getDate() + 3 )}`;
          
          cy.get('.calendario__item--link').click()
          cy.get('.editar__form--nombre').clear().type(titulo)
          cy.get('.editar__form--final-fecha').type(pasadoManana);
          cy.get('.editar__boton--aceptar').click()
          cy.get('.calendario__item--link').first().should('have.text', `01:01\u00A0\u00A0${titulo}`)
          cy.get('.calendario__item--link').should('have.length', 3)
      })
    })

    it('Que el usuario creador este participando del evento', () => {
      cy.get('.calendario__item--link').first().click()
      cy.get('.editar__creador').should('have.text', 'Cypress');
      cy.get('.editar__boton--cancelar').click()
    })

    it('Borra el nombre de usuario, no deberia poder editar el evento', () => {
      cy.get('.input__usuario').clear();
      cy.get('.calendario__item--link').first().click()
      cy.get('.input__usuario-warning').should('be.visible');
    })

    it('Participa del evento y chequea que este agregado el nuevo user', () => {
      cy.get('.input__usuario').type('Cypress 2');
      cy.get('.calendario__item--link').first().click()
      cy.get('.editar__boton--participar').click()
      cy.get('.calendario__item--link').first().click()
      cy.get('.editar__participantes--lista-item').eq(1).should('have.text', 'Cypress 2');
    })

    it('Deja de participar', () => {
      cy.get('.editar__boton--noparticipar').click()
      cy.get('.calendario__item--link').first().click()
      cy.get('.editar__participantes--lista-item').eq(1).should('not.exist');
      cy.get('.editar__boton--cancelar').click()
    })

    it('Si eliminas el evento que no este mas', () => {
      cy.get('.input__usuario').clear().type('Cypress');
      cy.get('.calendario__item--link').first().click()
      cy.get('.editar__boton--eliminar').click();
      cy.get('.calendario__item--link').should('not.exist')
    })
  })
});

