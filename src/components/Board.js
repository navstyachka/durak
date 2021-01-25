import React, { useState } from 'react'
import { useStoreon } from 'storeon/react'

import { SUIT_ICONS } from '../constants'

import PlayerPanel from './PlayerPanel'
import RobotPanel from './RobotPanelPanel'
import GamePanel from './GamePanel'

import {
  StyledBoard,
  StyledInfo,
  StyledDisclaimer,
  StyledStartBtn,
} from './styles'

const Board = () => {
  const { dispatch, deck, trump, turn } = useStoreon('deck', 'trump', 'turn')
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
            {turn.toUpperCase()} goes first
            <StyledStartBtn onClick={startGame}>Let's go!</StyledStartBtn>
            {turn === 'robot' && (
              <div>Not happy? Keep refreshing and wait for your luck! 🌚</div>
            )}
          </div>
        </StyledDisclaimer>
      )}
      <StyledInfo>
        Trump: {SUIT_ICONS[trump]}
        <div>Cards left: {deck.length}</div>
      </StyledInfo>
      <RobotPanel />
      <GamePanel />
      <PlayerPanel />
    </StyledBoard>
  )
}

export default Board
