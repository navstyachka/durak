import React from 'react'
import { useStoreon } from 'storeon/react'

import Card from './Card'

const Draw = () => {
  const { draw } = useStoreon('draw')
  return <Card hidden={draw.length} card={draw.length} />
}

export default Draw
