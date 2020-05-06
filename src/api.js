import { popularCalendario } from './ui.js';

export function obtenerEventos() {
  const url = './src/data/index.json';

  return fetch(url)
    .then((r) => r.json())
    .then((resultados) => {

      popularCalendario(resultados);
    });
}