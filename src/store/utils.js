import { CARD_SUITS, CARD_VALUES } from '../constants'
export class CardDeck {
  // Generate a deck of 36 cards (short version of the deck)
  generateDeck = () => {
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

  shuffleDeck = (deck) => {
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
  getNewDeck = () => {
    const deck = this.generateDeck()
    return this.shuffleDeck(deck)
  }

  getTrump = () => {
    return CARD_SUITS[Math.floor(Math.random() * 4)]
  }
}
