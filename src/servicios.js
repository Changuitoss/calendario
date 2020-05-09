export function obtenerDateAgregarEvento(e) {
  const fechaSeleccionada = new Date(e.target.parentElement.dataset.fecha);
  const anio = fechaSeleccionada.getFullYear();
  const mes = fechaSeleccionada.getMonth() + 1;
  const dia = fechaSeleccionada.getDate();
  let fechaValue = `${anio}-${pad(mes)}-${pad(dia)}`;

  const inicia = document.querySelector('.agregar__form--inicio-fecha');
  inicia.setAttribute('value', fechaValue); // Meto este value para usarlo al enviar el evento, esta hidden.

  const finaliza = document.querySelector('.agregar__form--final-fecha');
  finaliza.setAttribute('value', fechaValue);

  return fechaSeleccionada
}

export function pad(n) { 
  return n < 10 ? '0' + n : n;
}

