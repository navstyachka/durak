import React, { useEffect } from 'react'
import { useStoreon } from 'storeon/react'

import { PLAYER, ROBOT } from '../constants'
import {
  checkIfCardCanGo,
  pickComputerDefenseCard,
  pickComputerAttackCard,
  getRandomCard,
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
  useEffect(() => {
    // I left all those if-else for a reason – it is more code but easier to understand the logic

    if (turn === ROBOT) {
      if (attacker === ROBOT) {
        // If Robot has no more cards on hand, we need to switch a turn
        if (!robotCards.length) {
          console.log('Robot has no more cards to attack with!')
          dispatch('draw')
        } else {
          const attackCard = pickComputerAttackCard(robotCards, cards[0], trump)
          // Check if there are cards to attack with
          if (attackCard) {
            dispatch('pushCardInGame', attackCard)
          } else {
            console.log('Robot has no more cards to attack with!')
            dispatch('draw')
          }
        }
      } else {
        const defenseCard = pickComputerDefenseCard(robotCards, cards[0], trump)

        // If Robot has nothing to defend with, they abandon the defense
        if (!defenseCard) {
          console.log('Robot has nothing to defend with!')
          dispatch('abandonDefense')
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
          console.log('Player has no more cards to attack with!')
          // draw
          // give robot new cards
          // give player new cards
          // switch turn
          // switch attacker
        }
      }
      if (attacker === ROBOT) {
        // If Player has nothing to defense with, they need to abandon the defense
        const availableCards = playerCards.filter((card) =>
          checkIfCardCanGo(card, cards[0], trump, false)
        )
        if (!availableCards.length) {
          console.log('Player has nothing to defend with!')
          // refresh the board
          // give player the table cards
          // give robot new cards
          // switch turn
          // switch attacker
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
