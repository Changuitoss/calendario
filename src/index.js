import { creaCalendarioGrid, defaultFechaInput, setInputListeners, listenerAgregaEvento } from './ui.js';
import { obtenerKeysEventos } from './api.js';

creaCalendarioGrid(undefined, defaultFechaInput());
setInputListeners();
obtenerKeysEventos();

/* function guardarEnLocalStorage() {
  const data = JSON.stringify(base);
  localStorage.setItem('eventos', data)
  //console.log(data)
}

guardarEnLocalStorage() */
