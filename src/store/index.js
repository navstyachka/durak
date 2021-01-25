import { createStoreon } from 'storeon'
import dot from 'dot-prop-immutable'
import { CardDeck } from './utils'

const deckUtils = new CardDeck()
const chooseTurn = Math.floor(Math.random() * 2) ? 'player' : 'robot'
const initialStore = {
  deck: deckUtils.getNewDeck(),
  player: [],
  robot: [],
  trump: deckUtils.getTrump(),
  inGame: [],
  turn: chooseTurn,
}

const deck = (store) => {
  store.on('@init', () => initialStore)
  store.on('setTrump', ({ trump }, nextTrump) => nextTrump)
  store.on('startGame', () => {
    store.dispatch('takeCardsFromDeck', { itemsToTake: 6, target: 'player' })
    store.dispatch('takeCardsFromDeck', { itemsToTake: 3, target: 'robot' })
  })
  store.on('takeCardsFromDeck', ({ deck }, { itemsToTake, target } = 0) => {
    const newDeck = [...deck]
    const takenCards = newDeck.splice(0, itemsToTake)
    if (target) {
      store.dispatch(
        target === 'player' ? 'givePlayerCards' : 'giveRobotCards',
        takenCards
      )
    }
    return {
      deck: newDeck,
    }
  })
  store.on('givePlayerCards', ({ player }, cards) => ({
    player: [...player, ...cards],
  }))
  store.on('giveRobotCards', ({ robot }, cards) => ({
    robot: [...robot, ...cards],
  }))
  store.on('switchTurn', ({ turn }) => (turn === 'robot' ? 'player' : 'robot'))
}

export const store = createStoreon([deck])
