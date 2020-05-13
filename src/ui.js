import { obtenerKeysEventos, postEventoNuevo, postNuevoParticipante, removerParticipante, obtenerEventoParticular } from "./api.js";
import { obtenerDateAgregarEvento, pad } from './servicios.js';

export function creaCalendarioGrid(e, inicial) {
  if(!e) { //Setup inicial
    let fecha = inicial;
    const numeroDiaDeSemana = fecha.getDay();
    let numeroDiaDelMes = fecha.getDate();
    const calendarioGrid = document.querySelector('.calendario__grid');

    mostrarMes(fecha);

    for (let i = 0; i < 35; i++) {  
      const dia = document.createElement('div');
      dia.classList.add('calendario__dia');
      calendarioGrid.appendChild(dia);
    }

    //Llena el calendario con los numeros de dia de hoy hacia adelante.
    const calendarioCeldas = Array.from(document.querySelectorAll('.calendario__dia')); 

    for (let i = numeroDiaDeSemana; i < calendarioCeldas.length; i++) {
      calendarioCeldas[i].textContent = fecha.getDate();
      const agregar = document.createElement('a');
      agregar.classList.add('calendario__agregar');
      agregar.setAttribute('href', '#agregar')
      agregar.textContent = '+';
      const eventosUl = document.createElement('ul');
      eventosUl.classList.add('calendario__lista');
      calendarioCeldas[i].appendChild(agregar);
      calendarioCeldas[i].appendChild(eventosUl);
      
      if (fecha.getDate() == 1) { //Se fija cuando pasas al proximo mes para resetear numeroDiaDelMes
        numeroDiaDelMes = 1
        calendarioCeldas[i].setAttribute('data-fecha', fecha);
        fecha.setDate(numeroDiaDelMes + 1)
        numeroDiaDelMes++
      }
      else {
        calendarioCeldas[i].setAttribute('data-fecha', fecha);
        fecha.setDate(numeroDiaDelMes + 1)
        numeroDiaDelMes++
      }
    }

    //Llena el calendario con los numeros de dia de hoy hacia atras.
    const hoy = new Date();
    fecha = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), hoy.getHours(), hoy.getMinutes());
    numeroDiaDelMes = fecha.getDate();

    for (let i = numeroDiaDeSemana - 1; i >= 0; i--) {
      calendarioCeldas[i].textContent = fecha.getDate() - 1;
      const agregar = document.createElement('a');
      agregar.classList.add('calendario__agregar');
      agregar.setAttribute('href', '#agregar')
      agregar.textContent = '+';
      const eventosUl = document.createElement('ul');
      eventosUl.classList.add('calendario__lista');
      calendarioCeldas[i].appendChild(agregar);
      calendarioCeldas[i].appendChild(eventosUl);

      fecha.setDate(numeroDiaDelMes - 1)
      calendarioCeldas[i].setAttribute('data-fecha', fecha);
      numeroDiaDelMes--
    }
  } 

  if(e) { //Cuando se cambia la fecha del calendario
    let fecha = new Date(`${e.target.value}`);
    const numeroDiaDeSemana = fecha.getDay();
    let numeroDiaDelMes = fecha.getDate();
    const calendarioGrid = document.querySelector('.calendario__grid');
    calendarioGrid.innerHTML = '';
    mostrarMes(fecha);

    for (let i = 0; i < 35; i++) {
      const dia = document.createElement('div');
      dia.classList.add('calendario__dia');
      dia.setAttribute('data-fecha', fecha);
      calendarioGrid.appendChild(dia);
    }

    //Llena el calendario con los numeros de dia, desde el dia seleccionado hacia adelante. 
    const calendarioCeldas = Array.from(document.querySelectorAll('.calendario__dia')); 
    for (let i = numeroDiaDeSemana; i < calendarioCeldas.length; i++) {
      calendarioCeldas[i].textContent = fecha.getDate();
      const agregar = document.createElement('a');
      agregar.classList.add('calendario__agregar');
      agregar.setAttribute('href', '#agregar')
      agregar.textContent = '+';
      const eventosUl = document.createElement('ul');
      eventosUl.classList.add('calendario__lista');
      calendarioCeldas[i].appendChild(agregar);
      calendarioCeldas[i].appendChild(eventosUl);

      if (fecha.getDate() == 1) { //Se fija cuando pasas al proximo mes
        numeroDiaDelMes = 1
        calendarioCeldas[i].setAttribute('data-fecha', fecha);
        fecha.setDate(numeroDiaDelMes + 1);
        numeroDiaDelMes++
      }
      else {
        calendarioCeldas[i].setAttribute('data-fecha', fecha);
        fecha.setDate(numeroDiaDelMes + 1);
        numeroDiaDelMes++
      }
    }

    //Llena el calendario con los numeros de dia, desde el dia seleccionado hacia atras.
    fecha = new Date(`${e.target.value}`);
    numeroDiaDelMes = fecha.getDate();

    for (let i = numeroDiaDeSemana - 1; i >= 0; i--) {
      calendarioCeldas[i].textContent = fecha.getDate() - 1;
      const agregar = document.createElement('a');
      agregar.classList.add('calendario__agregar');
      agregar.setAttribute('href', '#agregar')
      agregar.textContent = '+';
      const eventosUl = document.createElement('ul');
      eventosUl.classList.add('calendario__lista');
      calendarioCeldas[i].appendChild(agregar);
      calendarioCeldas[i].appendChild(eventosUl);
      fecha.setDate(numeroDiaDelMes - 1)
      calendarioCeldas[i].setAttribute('data-fecha', fecha);
      numeroDiaDelMes--
    }

    //obtenerEventos();
  }
  listenerAgregaEvento();
}

export function defaultFechaInput() {
  const dateInput = document.querySelector('.input__calendario');
  const hoy = new Date();
  const hoyAnio = hoy.getFullYear();
  const hoyMes = hoy.getMonth() + 1;
  const hoyDia = hoy.getDate();
  const hoyFecha = `${hoyAnio}-0${pad(hoyDia)}-0${pad(hoyMes)}`;
  const hoyFull = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

  dateInput.setAttribute('value', hoyFecha);

  return hoyFull;
}

function mostrarMes(fecha) {
    const nombreMesArr = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mes = fecha.getMonth();
    const nombreMesDOM = document.querySelector('.header__nav--mes');

    nombreMesDOM.textContent = nombreMesArr[mes];
}

export function setInputListeners() {
  const dateInput = document.querySelector('.input__calendario');

  dateInput.addEventListener('change', creaCalendarioGrid);
} 

export function popularCalendario(eventos) { //Los arrays "sinHora" son para standarizar en milisegundos los dates de eventos y dataset.fecha.
  const celdasArr = Array.from(document.querySelectorAll('.calendario__dia'));
  const datesArr = celdasArr.map((celda) => new Date(celda.dataset.fecha));
  const datesArrSinHora = datesArr.map((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()); 
  const eventosUl = document.querySelectorAll('ul');
  eventosUl.forEach((evento) => evento.innerHTML = '');
  //console.log(eventos)

  eventos.forEach((entrada) => {
    const evento = JSON.parse(localStorage.getItem(entrada));
    const inicio = new Date(evento.start);
    const inicioSinHora = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate()).getTime();
    const index = datesArrSinHora.indexOf(inicioSinHora);
    
    if (index !== -1) {
      const eventosUl = celdasArr[index].querySelector('ul');
      const titulo = evento.summary;
      const eventosItem = document.createElement('li');
      eventosItem.classList.add('calendario__item');
      const itemLink = document.createElement('a');
      itemLink.classList.add('calendario__item--link');
      itemLink.textContent = titulo;
      itemLink.setAttribute('data-key', entrada)
      itemLink.setAttribute('href', '#editar')
      eventosItem.appendChild(itemLink);
      eventosUl.appendChild(eventosItem);

      itemLink.addEventListener('click', editarEventoHandler); 
    }
  })
}

export function agregarEventoHandler(e) {
  e.preventDefault();
  window.location = '#top';
  const usuario = document.querySelector('.input__usuario').value;
  const hoy = new Date().toISOString()
  const nombre = e.target.nombre.value;
  const descripcion = e.target.descripcion.value;

  const inicioFecha = e.target.iniciofecha.value;
  const inicioHorario = e.target.inicio.value;
  const inicioFinal = new Date(`${inicioFecha}T${inicioHorario}`).toISOString();

  const finalFecha = new Date(e.target.finalfecha.value);
  const finalHorario = e.target.finalhora.value;
  const finalHora = finalHorario.split(':')[0];
  const finalMinutos = finalHorario.split(':')[1];
  const finalFinal = new Date(finalFecha.getFullYear(), 
                              pad(finalFecha.getMonth()), 
                              pad(finalFecha.getDate()),
                              finalHora, 
                              finalMinutos).toISOString();
  
  const data = {
    "id": 0,
    "created": hoy,
    "updated": hoy,
    "summary": nombre,
    "description": descripcion,
    "color": "#F00",
    "creator": {  
      "id": 1,
      "email": "test@test.com",
      "displayName": usuario,
      "self": true
    },
    "start": inicioFinal,
    "end": finalFinal,
    "attendees": [
      {
        "id": 1,
        "email": "test@test.com",
        "displayName": usuario,
        "organizer": true,
        "self": true,
        "responseStatus": true
      }
    ]
  }

  postEventoNuevo(data);
}

export function listenerAgregaEvento() {
  const agregarBtn = document.querySelectorAll('.calendario__agregar');
  agregarBtn.forEach((btn) => btn.addEventListener('click', obtenerDateAgregarEvento)); 
}

function editarEventoHandler(e) {
  const eventoKey = e.target.dataset.key;
  const evento = obtenerEventoParticular(eventoKey);
  const usuario = document.querySelector('.input__usuario').value;

  const { summary: titulo, 
          start: inicio, 
          end: final, 
          description: descripcion, 
          attendees: participantes  } = evento;
  const creador = evento.creator.displayName;
  const participantesArr = [];
  
  const tituloInput = document.querySelector('.editar__form--nombre');
  const inicioInput = document.querySelector('.editar__form--inicio');
  const inicioValue = new Date(inicio);
  const inicioHora = `${pad(inicioValue.getHours())}:${pad(inicioValue.getMinutes())}`
  const finFechaInput = document.querySelector('.editar__form--final-fecha');
  const finValue = new Date(final);
  const finFecha = `${finValue.getFullYear()}-${pad(finValue.getMonth())}-${pad(finValue.getDate())}`;
  const finHoraInput = document.querySelector('.editar__form--final-hora');
  const finHora = `${pad(finValue.getHours())}:${pad(finValue.getMinutes())}`;
  const descripcionInput = document.querySelector('.editar__form--descripcion');
  const participantesDOM = document.querySelector('.editar__participantes-lista')
  participantesDOM.innerHTML = '';

  const aceptarBtn = document.querySelector('.editar__boton--aceptar');
  const participarBtn = document.querySelector('.editar__boton--participar');
  const noParticiparBtn = document.querySelector('.editar__boton--noparticipar');
  const eliminarBtn = document.querySelector('.editar__boton--eliminar');
  
  tituloInput.value = titulo;
  inicioInput.value = inicioHora;
  finFechaInput.value = finFecha;
  finHoraInput.value = finHora;
  descripcionInput.value = descripcion;

  participantes.forEach((participante) => {
    participantesArr.push(participante.displayName);
    const participanteNombre = participante.displayName;
    const pParticipante = document.createElement('p');
    pParticipante.textContent = participanteNombre;
    participantesDOM.appendChild(pParticipante);
  });

  if(usuario !== creador && !participantesArr.includes(usuario)) {
    participarBtn.style.display = 'inline-block';
    noParticiparBtn.style.display = 'none';
    eliminarBtn.style.display = 'none';
    aceptarBtn.style.display = 'none';
    tituloInput.setAttribute('disabled', true);
    inicioInput.setAttribute('disabled', true);
    finFechaInput.setAttribute('disabled', true);
    finHoraInput.setAttribute('disabled', true);
    descripcionInput.setAttribute('disabled', true);
  } 
  else if (usuario !== creador && participantesArr.includes(usuario)) {
    participarBtn.style.display = 'none';
    noParticiparBtn.style.display = 'inline-block';
    eliminarBtn.style.display = 'none';
    aceptarBtn.style.display = 'none';
    tituloInput.setAttribute('disabled', true);
    inicioInput.setAttribute('disabled', true);
    finFechaInput.setAttribute('disabled', true);
    finHoraInput.setAttribute('disabled', true);
    descripcionInput.setAttribute('disabled', true);
  }
  else {
    participarBtn.style.display = 'none';
    eliminarBtn.style.display = 'inline-block';
    aceptarBtn.style.display = 'inline-block';
    tituloInput.removeAttribute('disabled');
    inicioInput.removeAttribute('disabled');
    finFechaInput.removeAttribute('disabled');
    finHoraInput.removeAttribute('disabled');
    descripcionInput.removeAttribute('disabled');
  }

  agregaListenersEditar(eventoKey);
}

function eliminarHandler(e) {
  const eventoKey = e.target.dataset.key;
  localStorage.removeItem(eventoKey);
  obtenerKeysEventos()
}

function participarHandler(e) {
  const eventoKey = e.target.dataset.key;
  const usuario = document.querySelector('.input__usuario').value;

  postNuevoParticipante(eventoKey, usuario);
}

function noParticiparHandler(e) {
  const eventoKey = e.target.dataset.key;
  const usuario = document.querySelector('.input__usuario').value;

  removerParticipante(eventoKey, usuario);
}

function agregaListenersEditar(eventoKey) {
  const eliminarBtn = document.querySelector('.editar__boton--eliminar');
  eliminarBtn.setAttribute('data-key', eventoKey);
  eliminarBtn.addEventListener('click', eliminarHandler);
  
  const participarBtn = document.querySelector('.editar__boton--participar');
  participarBtn.setAttribute('data-key', eventoKey);
  participarBtn.addEventListener('click', participarHandler);

  const noParticiparBtn = document.querySelector('.editar__boton--noparticipar');
  noParticiparBtn.setAttribute('data-key', eventoKey);
  noParticiparBtn.addEventListener('click', noParticiparHandler);
}

const submitBtn = document.querySelector('.agregar__form');
submitBtn.addEventListener('submit', agregarEventoHandler);