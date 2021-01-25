import React from 'react'
import { useStoreon } from 'storeon/react'

import Card from './Card'
import { StyledPanel, StyledPanelCard } from './styles'

const RobotPanel = () => {
  const { robot: cards } = useStoreon('robot')
  return (
    <StyledPanel>
      {cards.map((card) => (
        <StyledPanelCard>
          <Card card={card} hidden />
        </StyledPanelCard>
      ))}
    </StyledPanel>
  )
}

export default RobotPanel
