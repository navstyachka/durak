import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'

import { runGameActions } from '../helpers'

import Card from './Card'
import Draw from './Draw'
import {
  StyledGameField,
  StyledGamePanel,
  StyledGameCentralCard,
  StyledGameStackedCards,
  StyledGameStackedCard,
} from './styles'

const GamePanel = () => {
  const {
    dispatch,
    deck,
    inGame: cards,
    turn,
    attacker,
    robot: robotCards,
    player: playerCards,
    trump,
  } = useStoreon(
    'deck',
    'inGame',
    'turn',
    'attacker',
    'robot',
    'player',
    'trump'
  )

  // Every time on turn change we automatically make either Robot go or update Player state
  useEffect(() => {
    runGameActions(
      dispatch,
      cards,
      playerCards,
      robotCards,
      turn,
      attacker,
      trump
    )
  }, [turn])

  return (
    <StyledGamePanel>
      <Draw />
      <StyledGameField>
        <StyledGameCentralCard>
          <Card card={cards[0]} />
        </StyledGameCentralCard>
        <StyledGameStackedCards>
          {cards.map((card, idx) =>
            idx === 0 ? null : (
              <StyledGameStackedCard>
                <Card card={card} />
              </StyledGameStackedCard>
            )
          )}
        </StyledGameStackedCards>
      </StyledGameField>
      <Card hidden card={deck.length} />
    </StyledGamePanel>
  )
}

export default GamePanel
