import { popularCalendario } from './ui.js';

export function obtenerEventos() {
  const url = './src/data/index.json';

  return fetch(url)
    .then((r) => r.json())
    .then((resultados) => {

      popularCalendario(resultados);
    });
}

export function postEventoNuevo(data) {
  const url = './src/data/index.json';

  console.log(JSON.stringify(data))
  console.log('fetcheando')
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log('Succes: ', data));
}