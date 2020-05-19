import { validaUsuario } from './ui.js'

export function obtenerDateAgregarEvento(e) {
  const usuario = document.querySelector('.input__usuario').value;
  
  if (!usuario) {
    validaUsuario(e);
    return
  }
  else {
    validaUsuario(e)
    clearEvento()
    const fechaSeleccionada = new Date(e.target.parentElement.dataset.fecha);
    const anio = fechaSeleccionada.getFullYear();
    const mes = fechaSeleccionada.getMonth() + 1;
    const dia = fechaSeleccionada.getDate();
    let fechaValue = `${anio}-${pad(mes)}-${pad(dia)}`;
  
    const inicia = document.querySelector('.agregar__form--inicio-fecha');
    inicia.setAttribute('value', fechaValue); // Meto este value para usarlo al enviar el evento, esta hidden.
  
    const finaliza = document.querySelector('.agregar__form--final-fecha');
    finaliza.setAttribute('value', fechaValue);
  
    return fechaSeleccionada
  }
}

export function pad(n) { //Agrega o saca el 0 (cero) de los valores de mes y dia.
  return n < 10 ? '0' + n : n;
}

function clearEvento() {
  const eventoInputs = document.querySelectorAll(`.agregar__form--nombre, 
                                                  .agregar__form--inicio, 
                                                  .agregar__form--final-hora, 
                                                  .agregar__form--descripcion`);
  eventoInputs.forEach((evento) => evento.value = '');                                  
}

