import { createStoreon } from 'storeon'
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
  turn: PLAYER,
  attacker: PLAYER,
  // turn: chooseTurn,
  // attacker: chooseTurn,
  draw: [],
}

const deck = (store) => {
  store.on('@init', () => initialStore)
  store.on('setTrump', ({ trump }, nextTrump) => nextTrump)
  store.on('startGame', () => {
    store.dispatch('takeCardsFromDeck', {
      itemsToTake: CARDS_ON_HAND_MIN,
      target: PLAYER,
    })
    store.dispatch('takeCardsFromDeck', {
      itemsToTake: CARDS_ON_HAND_MIN,
      target: ROBOT,
    })
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
  store.on('draw', ({ draw, inGame, player, robot }) => {
    // On draw we need to provide both Robot and Player with new cards if they have less than min amount
    if (player.length < CARDS_ON_HAND_MIN)
      store.dispatch('takeCardsFromDeck', {
        itemsToTake: CARDS_ON_HAND_MIN - player.length,
        target: PLAYER,
      })

    if (robot.length < CARDS_ON_HAND_MIN)
      store.dispatch('takeCardsFromDeck', {
        itemsToTake: CARDS_ON_HAND_MIN - robot.length,
        target: PLAYER,
      })

    // On draw we always switch turn and attacker
    store.dispatch('switchTurn')
    store.dispatch('switchAttackTurn')

    // Clear the table
    return {
      inGame: [],
      draw: [...draw, ...inGame],
    }
  })

  store.on('abandonDefense', ({ draw, inGame, player, robot }, target) => {
    // refresh the board
    // give looser the table cards
    // give winner new cards
    // switch turn
    // switch attacker

    return {
      inGame: [],
    }
  })
}

export const store = createStoreon([deck])
