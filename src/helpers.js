import { PLAYER, ROBOT } from './constants'

// Attack and defence logic
export const checkIfCardCanGo = (card, cardOnTheTable, trump, isAttacking) => {
  // If there's no cards on the table, the player can use anything
  if (!cardOnTheTable && isAttacking) return true

  // If the player attacks, they can only use the same rank as the latest card put on the table
  if (isAttacking) {
    return card.value === cardOnTheTable.value
  }

  // If the player defends, they need to put a card of a higher rank or a trump
  if (!isAttacking) {
    // Higher rank will always beat a lower one of the same suit
    if (card.suit === cardOnTheTable.suit && card.value > cardOnTheTable.value)
      return true

    // If the card is a trump, it will beat anything that is not a higher rank trump
    return card.suit === trump && cardOnTheTable.suit !== trump
  }

  return false
}

// Robot's attack and defense will always be random but not the best choice possible
export const getRandomCard = (cards) =>
  cards[Math.round(Math.random() * (cards.length - 1))]

export const pickComputerCard = (cards, cardOnTheTable, trump, isAttacking) => {
  // If no cards available, we return undefined
  return getRandomCard(
    cards.filter((card) => checkIfCardCanGo(card, cardOnTheTable, trump, isAttacking))
  )
}

// Automatic game actions on turn change
export const runGameActions = (
  dispatch,
  cards,
  playerCards,
  robotCards,
  turn,
  attacker,
  trump
) => {
  // I left all those if-else for a reason – it is more code but easier to understand the logic
  // For the same reason I did not abstract parts of these clauses

  if (turn === ROBOT) {
    if (attacker === ROBOT) {
      // If Robot has no more cards on hand, we need to switch a turn
      // Also we check if there are cards to attack with
      const attackCard = pickComputerCard(robotCards, cards[0], trump, true)
      if (!robotCards.length || !attackCard) {
        alert('Robot has no more cards to attack with!')
        dispatch('draw')
      } else {
        dispatch('pushCardInGame', attackCard)
      }
    }

    if (attacker === PLAYER) {
      const defenseCard = pickComputerCard(robotCards, cards[0], trump, false)

      // If Robot has nothing to defend with, they abandon the defense
      if (!defenseCard) {
        alert('Robot has nothing to defend with!')
        dispatch('abandonDefense', ROBOT)
      } else {
        // Otherwise Robot defends with a random suitable card
        dispatch('pushCardInGame', defenseCard)
      }
    }
  }

  if (turn === PLAYER) {
    if (attacker === PLAYER) {
      // If Player has no more cards on hand, we need to switch a turn
      // Also we check if there are cards to attack with
      const attackCard = playerCards.filter((card) =>
        checkIfCardCanGo(card, cards[0], trump, true)
      )

      if (!playerCards.length || !attackCard.length) {
        alert('Oops, you have no more cards to attack with!')
        dispatch('draw')
      }
    }
    if (attacker === ROBOT) {
      // If Player has nothing to defense with, they need to abandon the defense
      const availableCards = playerCards.filter((card) =>
        checkIfCardCanGo(card, cards[0], trump, false)
      )
      if (!availableCards.length) {
        alert('Oops, you have no more cards to defend with!')
        dispatch('abandonDefense', PLAYER)
      }
    }
  }
}
