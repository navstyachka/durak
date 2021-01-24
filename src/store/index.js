import { createStoreon } from 'storeon'

let deck = (store) => {
  store.on('@init', () => [])
  store.on('update', () => [])
}

export const store = createStoreon([deck])
