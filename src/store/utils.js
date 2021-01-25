import { CARD_SUITS, CARD_VALUES } from '../constants'

// Generate a deck of 36 cards (short version of the deck)
export const generateDeck = () => {
  const deck = []

  const getCardsForSuit = (suit) => {
    CARD_VALUES.forEach((value) => {
      deck.push({
        suit,
        value,
      })
    })
  }

  CARD_SUITS.forEach((suit) => {
    getCardsForSuit(suit)
  })

  return deck
}

export const shuffleDeck = (deck) => {
  // I did not write the algorithm for shuffling myself
  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const randId = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[randId]] = [arr[randId], arr[i]]
    }

    return arr
  }

  return shuffleArray(deck)
}

// Get shuffled and formatted deck of cards
export const getNewDeck = () => {
  const deck = generateDeck()
  return shuffleDeck(deck)
}

export const getTrump = () => {
  return CARD_SUITS[Math.floor(Math.random() * 4)]
}
