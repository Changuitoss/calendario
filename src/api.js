import { popularCalendario } from './ui.js';


export function obtenerKeysEventos() {  
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
  
  obtenerKeysEventos();
}

export function postNuevoParticipante(eventoKey, usuario) {
  const evento = JSON.parse(localStorage.getItem(eventoKey));
  const participantesArray = evento.attendees;

  const participante = {
    "id": 1,
    "email": "test@test.com",
    "displayName": usuario,
    "organizer": false,
    "self": true,
    "responseStatus": true
  } 

  participantesArray.push(participante);
  evento.attendees = participantesArray;
  localStorage.setItem(eventoKey, JSON.stringify(evento));
}

export function obtenerEventoParticular(key) {
  const evento = JSON.parse(localStorage.getItem(key));
  console.log(evento)
  return evento;
}