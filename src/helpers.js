import { CARD_SUITS } from './constants'

export const sortCardBySuit = (cards) => {
  const sortedObject = {}
  CARD_SUITS.forEach(
    (suit) =>
      (sortedObject[suit] = cards.flatMap((card) =>
        card.suit === suit ? [card.value] : []
      ))
  )

  return sortedObject
}

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

export const pickComputerAttackCard = (cards, cardOnTheTable, trump) => {
  // If no cards available, we return undefined
  return getRandomCard(
    cards.filter((card) => checkIfCardCanGo(card, cardOnTheTable, trump, true))
  )
}
export const pickComputerDefenseCard = (cards, cardOnTheTable, trump) => {
  // If no cards available, we return undefined
  return getRandomCard(
    cards.filter((card) => checkIfCardCanGo(card, cardOnTheTable, trump, false))
  )
}
