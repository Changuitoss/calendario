import { creaCalendarioGrid, defaultFechaInput, setInputListeners, popularCalendario } from './ui.js';
import { obtenerEventos } from './api.js';

creaCalendarioGrid(undefined, defaultFechaInput());
setInputListeners();
obtenerEventos();