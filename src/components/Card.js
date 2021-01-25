import React from 'react'
import { CARD_TITLES, SUIT_ICONS } from '../constants'
import { StyledCard } from './styles'

const Card = ({ card, hidden }) => {
  if (!card) return <StyledCard $empty />
  const { suit, value } = card
  if (hidden)
    return (
      <StyledCard $hidden>
        <div>
          <div>{SUIT_ICONS[suit]}</div>
          <div>{CARD_TITLES[value]}</div>
        </div>
      </StyledCard>
    )

  return (
    <StyledCard>
      <div>
        <div>{SUIT_ICONS[suit]}</div>
        <div>{CARD_TITLES[value]}</div>
      </div>
    </StyledCard>
  )
}

export default Card
