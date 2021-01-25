import React from 'react'
import { useStoreon } from 'storeon/react'

import Card from './Card'
import { StyledGameField, StyledGamePanel } from './styles'

const GamePanel = () => {
  const { deck } = useStoreon('deck')
  return (
    <StyledGamePanel>
      <StyledGameField />
      <Card hidden card={deck.length} />
    </StyledGamePanel>
  )
}

export default GamePanel
