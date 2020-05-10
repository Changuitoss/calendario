import { creaCalendarioGrid, defaultFechaInput, setInputListeners, listenerAgregaEvento } from './ui.js';
import { obtenerEventos } from './api.js';

creaCalendarioGrid(undefined, defaultFechaInput());
setInputListeners();
obtenerEventos();

/* function guardarEnLocalStorage() {
  const data = JSON.stringify(base);
  localStorage.setItem('eventos', data)
  //console.log(data)
}

guardarEnLocalStorage() */
