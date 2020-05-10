import { obtenerEventos, postEventoNuevo } from "./api.js";
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

    obtenerEventos();
  }
  listenerAgregaEvento();
}

export function defaultFechaInput() {
  const dateInput = document.querySelector('.input__calendario');
  const hoy = new Date();
  const hoyAnio = hoy.getFullYear();
  const hoyMes = hoy.getMonth() + 1;
  const hoyDia = hoy.getDate();
  const hoyFecha = `${hoyAnio}-0${hoyDia}-0${hoyMes}`;
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
      eventosItem.setAttribute('data-key', entrada)
      eventosItem.textContent = titulo;
      eventosUl.appendChild(eventosItem);
    }
  })
}

export function agregarEventoHandler(e) {
  e.preventDefault();
  window.location = '#top';
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
      "displayName": "Test Test",
      "self": true
    },
    "start": inicioFinal,
    "end": finalFinal,
    "attendees": [
      {
        "id": 1,
        "email": "test@test.com",
        "displayName": "Test Test",
        "organizer": true,
        "self": true,
        "responseStatus": true
      },
      {
        "id": 2,
        "email": "test2@test.com",
        "displayName": "Test2 Test",
        "organizer": false,
        "self": false,
        "responseStatus": false
      },
      {
        "id": 3,
        "email": "test3@test.com",
        "displayName": "Test3 Test",
        "organizer": false,
        "self": false,
        "responseStatus": null
      }
    ]
  }

  postEventoNuevo(data);
}

export function listenerAgregaEvento() {
  const agregarBtn = document.querySelectorAll('.calendario__agregar');
  agregarBtn.forEach((btn) => btn.addEventListener('click', obtenerDateAgregarEvento)); 
}

const submitBtn = document.querySelector('.agregar__form');
submitBtn.addEventListener('submit', agregarEventoHandler);