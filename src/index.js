import { creaCalendarioGrid, defaultFechaInput, setInputListeners, listenerAgregaEvento } from './ui.js';
import { obtenerKeysEventos } from './api.js';

creaCalendarioGrid(undefined, defaultFechaInput());
setInputListeners();
obtenerKeysEventos();
