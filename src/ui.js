export function creaCalendarioGrid(e, inicial) {
  if(!e) { //Setup inicial
    let fecha = inicial;
    const numeroDiaDeSemana = fecha.getDay();
    let numeroDiaDelMes = fecha.getDate();

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
      if (fecha.getDate() == 1) { //Se fija cuando pasas al proximo mes
        numeroDiaDelMes = 1
        fecha.setDate(numeroDiaDelMes + 1)
        numeroDiaDelMes++
      }
      else {
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
      fecha.setDate(numeroDiaDelMes - 1)
      numeroDiaDelMes--
    }
  } 

  if(e) { //Cuando se cambia la fecha del calendario
    let fecha = new Date(`${e.target.value}`);
    const numeroDiaDeSemana = fecha.getDay();
    let numeroDiaDelMes = fecha.getDate();
    const calendarioGrid = document.querySelector('.calendario__grid');
    calendarioGrid.innerHTML = '';
    console.log('numeroDiaDeSemana con E', numeroDiaDeSemana)

    for (let i = 0; i < 35; i++) {
      const dia = document.createElement('div');
      dia.classList.add('calendario__dia');
      calendarioGrid.appendChild(dia);
    }

    //Llena el calendario con los numeros de dia de hoy hacia adelante. 
    const calendarioCeldas = Array.from(document.querySelectorAll('.calendario__dia')); 
    for (let i = numeroDiaDeSemana; i < calendarioCeldas.length; i++) {
      calendarioCeldas[i].textContent = fecha.getDate();
      if (fecha.getDate() == 1) { //Se fija cuando pasas al proximo mes
        numeroDiaDelMes = 1
        fecha.setDate(numeroDiaDelMes + 1)
        numeroDiaDelMes++
      }
      else {
        fecha.setDate(numeroDiaDelMes + 1)
        numeroDiaDelMes++
      }
    }

    //Llena el calendario con los numeros de dia de hoy hacia atras.
    fecha = new Date(`${e.target.value}`);
    numeroDiaDelMes = fecha.getDate();

    for (let i = numeroDiaDeSemana - 1; i >= 0; i--) {
      calendarioCeldas[i].textContent = fecha.getDate() - 1;
      fecha.setDate(numeroDiaDelMes - 1)
      numeroDiaDelMes--
    }
  }
}

export function defaultFechaInput() {
  const dateInput = document.querySelector('.input__calendario');
  const hoy = new Date();
  const hoyAnio = hoy.getFullYear();
  const hoyMes = hoy.getMonth() + 1;
  const hoyDia = hoy.getDate();
  const hoyFecha = `${hoyAnio}-0${hoyDia}-0${hoyMes}`;
  const hoyFull = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), hoy.getHours(), hoy.getMinutes())


  dateInput.setAttribute('value', hoyFecha);

  return hoyFull;
}

export function setInputListener() {
  const dateInput = document.querySelector('.input__calendario');
  dateInput.addEventListener('change', creaCalendarioGrid);
} 