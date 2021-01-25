import React, { useEffect, useState } from 'react'
import { useStoreon } from 'storeon/react'

import Card from './Card'
import { StyledPanel, StyledPanelCard } from './styles'

const RobotPanel = () => {
  const { dispatch, robot: cardsInGame } = useStoreon('robot')
  const [cardFields, setCardFields] = useState(null)
  useEffect(() => {
    // options.flatMap(o => o.assigned ? [o.name] : []);
  }, [cardsInGame])
  console.log('cardFields', cardFields)

  if (!cardsInGame) return null

  return (
    <StyledPanel>
      {cardsInGame.map((card) => (
        <StyledPanelCard>
          <Card card={card} hidden />
        </StyledPanelCard>
      ))}
    </StyledPanel>
  )
}

export default RobotPanel
