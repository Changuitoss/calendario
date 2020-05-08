import { creaCalendarioGrid, defaultFechaInput, setInputListeners, listenerAgregaEvento } from './ui.js';
import { obtenerEventos } from './api.js';

creaCalendarioGrid(undefined, defaultFechaInput());
setInputListeners();
obtenerEventos();