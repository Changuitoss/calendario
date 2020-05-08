export function obtenerDateAgregarEvento(e) {
  const fechaSeleccionada = new Date(e.target.parentElement.dataset.fecha);
  const anio = fechaSeleccionada.getFullYear();
  const mes = fechaSeleccionada.getMonth() + 1;
  const dia = fechaSeleccionada.getDate();
  let fechaValue;

  if(mes > 9) {
    fechaValue = `${anio}-${mes}-${dia}`;
  } else {
    fechaValue = `${anio}-0${mes}-${dia}`;
  }

  const finaliza = document.querySelector('.agregar__form--final-fecha');
  finaliza.setAttribute('value', fechaValue);
  console.log(fechaValue)

  return fechaSeleccionada;
}

