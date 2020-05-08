import { popularCalendario } from './ui.js';

export function obtenerEventos() {
  const url = './src/data/index.json';

  return fetch(url)
    .then((r) => r.json())
    .then((resultados) => {

      popularCalendario(resultados);
    });
}

export function postEventoNuevo(nombre, inicio, final, descripcion) {
  const url = './src/data/index.json';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => console.log('Succes: ', data));
}