import { createStoreon } from 'storeon'
import { storeonDevtools } from 'storeon/devtools'
import { ROBOT, PLAYER, CARDS_ON_HAND_MIN } from '../constants'
import { CardDeck } from './utils'

const deckUtils = new CardDeck()
const chooseTurn = Math.floor(Math.random() * 2) ? PLAYER : ROBOT
const initialStore = {
  deck: deckUtils.getNewDeck(),
  player: [],
  robot: [],
  inGame: [],
  trump: deckUtils.getTrump(),
  turn: null,
  attacker: PLAYER,
  // turn: chooseTurn,
  // attacker: chooseTurn,
  draw: [],
}

const deck = (store) => {
  store.on('@init', () => initialStore)
  store.on('setTrump', ({ trump }, nextTrump) => nextTrump)
  store.on('startGame', ({ attacker }) => {
    store.dispatch('takeCardsFromDeck', {
      itemsToTake: CARDS_ON_HAND_MIN,
      target: PLAYER,
    })
    store.dispatch('takeCardsFromDeck', {
      itemsToTake: CARDS_ON_HAND_MIN,
      target: ROBOT,
    })
    return {
      turn: attacker,
    }
  })

  store.on('takeCardsFromDeck', ({ deck }, { itemsToTake, target } = 0) => {
    const newDeck = [...deck]
    const takenCards = newDeck.splice(0, itemsToTake)
    if (target) {
      store.dispatch(
        target === PLAYER ? 'givePlayerCards' : 'giveRobotCards',
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

  store.on('takePlayerCard', ({ player }, card) => ({
    player: [...player].filter(
      (iterationCard) =>
        !(
          iterationCard.suit === card.suit && iterationCard.value === card.value
        )
    ),
  }))

  store.on('takeRobotCard', ({ robot }, card) => ({
    robot: [...robot].filter(
      (iterationCard) =>
        !(
          iterationCard.suit === card.suit && iterationCard.value === card.value
        )
    ),
  }))

  store.on('switchTurn', ({ turn }) => ({
    turn: turn === ROBOT ? PLAYER : ROBOT,
  }))

  store.on('switchAttackTurn', ({ attacker }) => ({
    attacker: attacker === ROBOT ? PLAYER : ROBOT,
  }))

  store.on('pushCardInGame', ({ inGame, turn }, card) => {
    if (turn === PLAYER) store.dispatch('takePlayerCard', card)
    if (turn === ROBOT) store.dispatch('takeRobotCard', card)
    store.dispatch('switchTurn')
    const newInGame = [...inGame]
    newInGame.unshift(card)
    return {
      inGame: newInGame,
    }
  })

  store.on('setToMinCards', ({ player, robot }, target) => {
    if (target === PLAYER) {
      if (player.length < CARDS_ON_HAND_MIN)
        store.dispatch('takeCardsFromDeck', {
          itemsToTake: CARDS_ON_HAND_MIN - player.length,
          target: PLAYER,
        })
    }

    if (target === ROBOT) {
      store.dispatch('takeCardsFromDeck', {
        itemsToTake: CARDS_ON_HAND_MIN - robot.length,
        target: ROBOT,
      })
    }
  })

  store.on('draw', ({ draw, inGame }) => {
    // On draw we need to provide both Robot and Player with new cards if they have less than min amount
    store.dispatch('setToMinCards', PLAYER)
    store.dispatch('setToMinCards', ROBOT)

    // On draw we always switch turn and attacker
    store.dispatch('switchTurn')
    store.dispatch('switchAttackTurn')

    // Clear the table
    return {
      inGame: [],
      draw: [...draw, ...inGame],
    }
  })

  store.on('abandonDefense', ({ inGame }, target) => {
    // Looser takes the table cards
    store.dispatch(
      target === PLAYER ? 'givePlayerCards' : 'giveRobotCards',
      inGame
    )

    // Get the winner new cards
    const winner = target === PLAYER ? ROBOT : PLAYER
    store.dispatch('setToMinCards', winner)

    // Attacker in this case stays the same (bummer), so we only switch turns
    store.dispatch('switchTurn')

    // Clear the table
    return {
      inGame: [],
    }
  })
}

export const store = createStoreon([
  deck,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
])
