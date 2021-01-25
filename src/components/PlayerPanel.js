import React from 'react'
import { useStoreon } from 'storeon/react'

import Card from './Card'
import { StyledPanel, StyledPanelCard } from './styles'

const PlayerPanel = () => {
  const { dispatch, player: cards } = useStoreon('player')
  return (
    <StyledPanel>
      {cards.map((card) => (
        <StyledPanelCard>
          <Card card={card} />
        </StyledPanelCard>
      ))}
    </StyledPanel>
  )
}

export default PlayerPanel
