import React, { useCallback } from 'react'
import { useStoreon } from 'storeon/react'

import { PLAYER } from '../constants'
import { checkIfCardCanGo } from '../helpers'
import Card from './Card'
import { StyledPanel, StyledPanelCard } from './styles'

const PlayerPanel = () => {
  const { dispatch, player: cards, turn, attacker, inGame, trump } = useStoreon(
    'player',
    'turn',
    'attacker',
    'inGame',
    'trump'
  )

  const pickCard = (card) => {
    if (turn === PLAYER) {
      dispatch('pushCardInGame', card)
    }
  }

  const isActive = useCallback(
    (card) => {
      if (turn !== PLAYER) return false
      const cardOnTheTable = inGame[0]
      return checkIfCardCanGo(card, cardOnTheTable, trump, attacker === PLAYER)
    },
    [attacker, turn, inGame, trump]
  )

  return (
    <StyledPanel>
      {cards.map((card) => (
        <StyledPanelCard>
          <Card
            card={card}
            disabled={!isActive(card) || !(turn === PLAYER)}
            onClick={() => pickCard(card)}
          />
        </StyledPanelCard>
      ))}
    </StyledPanel>
  )
}

export default PlayerPanel
