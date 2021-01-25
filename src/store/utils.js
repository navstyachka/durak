import { CARD_SUITS } from '../constants'
export class CardDeck {
  cardValues = [6, 7, 8, 9, 10, 11, 12, 13, 14]

  // Generate a deck of 36 cards (short version of deck)
  generateDeck = () => {
    const deck = []

    const getCardsForSuit = (suit) => {
      this.cardValues.forEach((value) => {
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
