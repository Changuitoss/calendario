import { creaCalendarioGrid, defaultFechaInput, setInputListeners } from './ui.js';
import { obtenerEventos } from './api.js';

creaCalendarioGrid(undefined, defaultFechaInput());
setInputListeners();
obtenerEventos();