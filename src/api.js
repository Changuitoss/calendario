import { popularCalendario } from './ui.js';


export function obtenerEventos() {  
  const eventosProgramados = Object.keys(localStorage);

  popularCalendario(eventosProgramados)
}

export function postEventoNuevo(data) {
  const id = Number(localStorage.getItem('ultimoID'));
  if(id) {
    data.id = id;
    localStorage.setItem('ultimoID', id + 1);
    localStorage.setItem(`Evento-${id}`, JSON.stringify(data));
  } else {
    const id = data.id;
    localStorage.setItem('ultimoID', id + 1);
    localStorage.setItem(`Evento-${id}`, JSON.stringify(data));
  } 
  
  obtenerEventos();
}