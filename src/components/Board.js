import React, { useState } from 'react'
import { useStoreon } from 'storeon/react'

import { SUIT_ICONS, ROBOT, PLAYER } from '../constants'

import PlayerPanel from './PlayerPanel'
import RobotPanel from './RobotPanel'
import GamePanel from './GamePanel'

import {
  StyledBoard,
  StyledDisclaimer,
  StyledStartBtn,
  StyledActionText,
} from './styles'

const Board = () => {
  const { dispatch, deck, trump, attacker, turn } = useStoreon(
    'deck',
    'trump',
    'attacker',
    'turn'
  )
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setGameStarted(true)
    dispatch('startGame')
  }

  return (
    <StyledBoard>
      {!gameStarted && (
        <StyledDisclaimer>
          <div>
            {attacker.toUpperCase()} goes first
            <StyledStartBtn onClick={startGame}>Let's go!</StyledStartBtn>
            {attacker === ROBOT && (
              <div>Not happy? Keep refreshing and wait for your luck! 🌚</div>
            )}
          </div>
        </StyledDisclaimer>
      )}

      <RobotPanel />
      <GamePanel />
      <PlayerPanel />

      <StyledActionText>
        {`Now is ${turn === PLAYER ? 'your' : "robot's"} turn. ${
          turn === PLAYER ? 'You are ' : '🤖 Robot is'
        } ${attacker === turn ? 'attacking ⚔️' : 'defending 🛡'}`}
        <br />
        Trump: {SUIT_ICONS[trump]} Cards left in the deck: {deck.length}
      </StyledActionText>
    </StyledBoard>
  )
}

export default Board
