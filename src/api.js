import { popularCalendario } from './ui.js';
import { pad }  from './servicios.js';


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

export function removerParticipante(eventoKey, usuario) {
  const evento = JSON.parse(localStorage.getItem(eventoKey));
  const participantesArray = evento.attendees;

  participantesArray.forEach((participante) => {
    if(participante.displayName == usuario) {
      participantesArray.pop(participante);
    }
  });
  evento.attendees = participantesArray;
  localStorage.setItem(eventoKey, JSON.stringify(evento));
}

export function obtenerEventoParticular(key) {
  const evento = JSON.parse(localStorage.getItem(key));

  return evento;
}

export function postEventoEditado(eventoKey, titulo, hoy, descripcion, inicioFinal, finalFinal) {
  const evento = JSON.parse(localStorage.getItem(eventoKey));
  evento.updated = hoy;
  evento.summary = titulo;
  evento.description = descripcion;
  evento.start = inicioFinal;
  evento.end = finalFinal;
  
  localStorage.setItem(eventoKey, JSON.stringify(evento));

  obtenerKeysEventos();
}

export function obtenerFechaInicial(eventoKey) {
  const evento = JSON.parse(localStorage.getItem(eventoKey));
  const inicio = new Date(evento.start);
  const fechaInicio = `${inicio.getFullYear()}-${pad(inicio.getMonth() + 1)}-${pad(inicio.getDate())}`;

  return fechaInicio;
}