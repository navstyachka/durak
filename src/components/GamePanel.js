import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'

import { PLAYER, ROBOT } from '../constants'
import {
  checkIfCardCanGo,
  pickComputerDefenseCard,
  pickComputerAttackCard,
} from '../helpers'

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
  // We do it in useEffect because we use dispatch hook
  useEffect(() => {
    // I left all those if-else for a reason – it is more code but easier to understand the logic

    if (turn === ROBOT) {
      if (attacker === ROBOT) {
        // If Robot has no more cards on hand, we need to switch a turn
        // Also we check if there are cards to attack with
        const attackCard = pickComputerAttackCard(robotCards, cards[0], trump)
        if (!robotCards.length || !attackCard) {
          alert('Robot has no more cards to attack with!')
          dispatch('draw')
        } else {
          dispatch('pushCardInGame', attackCard)
        }
      }

      if (attacker === PLAYER) {
        const defenseCard = pickComputerDefenseCard(robotCards, cards[0], trump)

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
        if (!playerCards.length) {
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
  }, [turn])

  console.log('Turn: ', turn)
  console.log('Attack turn: ', attacker)

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
