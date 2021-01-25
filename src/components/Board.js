import React, { useState, useEffect } from 'react'
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
  StyledWinner,
} from './styles'

const Board = () => {
  const { dispatch, deck, trump, attacker, turn, player, robot } = useStoreon(
    'deck',
    'trump',
    'attacker',
    'turn',
    'player',
    'robot'
  )
  const [gameStarted, setGameStarted] = useState(false)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    if (!deck.length) {
      if (!player.length) {
        setWinner(PLAYER)
      }
      if (!robot.length) {
        setWinner(ROBOT)
      }
    }
  }, [deck, player, robot])

  const startGame = () => {
    setGameStarted(true)
    dispatch('startGame')
  }
  if (winner)
    return (
      <StyledBoard>
        <StyledWinner>
          {winner === PLAYER
            ? 'Congratulations! You won! ♠️🎉♥️🍾♦️✨♣️'
            : 'Uh-oh! 🤖 won 🙀 Try again! 🙈'}
        </StyledWinner>
      </StyledBoard>
    )

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
      {gameStarted && (
        <>
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
        </>
      )}
    </StyledBoard>
  )
}

export default Board
