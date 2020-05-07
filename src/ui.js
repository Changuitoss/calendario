import { obtenerEventos } from "./api.js";

export function creaCalendarioGrid(e, inicial) {
  if(!e) { //Setup inicial
    let fecha = inicial;
    const numeroDiaDeSemana = fecha.getDay();
    let numeroDiaDelMes = fecha.getDate();

    mostrarMes(fecha);

    for (let i = 0; i < 35; i++) {
      const calendarioGrid = document.querySelector('.calendario__grid');
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
      calendarioCeldas[i].appendChild(agregar);

      if (fecha.getDate() == 1) { //Se fija cuando pasas al proximo mes
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
      calendarioCeldas[i].appendChild(agregar);

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
      fecha.setDate(numeroDiaDelMes - 1)
      calendarioCeldas[i].setAttribute('data-fecha', fecha);
      numeroDiaDelMes--
    }

    obtenerEventos();
  }
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

  eventos.forEach((evento) => {
    const inicio = new Date(evento.start);
    const inicioSinHora = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate()).getTime();
    const index = datesArrSinHora.indexOf(inicioSinHora);
    
    if (index !== -1) {
      const titulo = evento.summary;
      const eventosUl = document.createElement('ul');
      eventosUl.classList.add('calendario__lista');
      const eventosItem = document.createElement('li');
      eventosItem.classList.add('calendario__item');
      eventosItem.textContent = titulo;
      celdasArr[index].appendChild(eventosUl);
      eventosUl.appendChild(eventosItem);
    }
  })
}