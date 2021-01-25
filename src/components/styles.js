// Styles are not neat and clean, I would separate them in different folders with their respective components
import styled from 'styled-components'

const COLOR_GREEN = '#365136'
const COLOR_GREEN_LIGHT = '#5e8f5e'
const CARD_HEIGHT = 160

// Board styles
export const StyledBoard = styled.div`
  position: relative;
  height: 100vh;
  min-height: 720px;
  min-width: 1000px;
  padding: 20px;
  background: ${COLOR_GREEN};
`

export const StyledDisclaimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 3;
  height: 100vh;
  margin-bottom: 20px;
  text-align: center;
  background: ${COLOR_GREEN};
`

export const StyledActionText = styled.div`
  margin: 30px 20px;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
`

export const StyledStartBtn = styled.button`
  height: 40px;
  margin-left: 20px;
  border: 2px solid #fff;
  border-radius: 2px;
  color: ${COLOR_GREEN};
  font-size: 16px;
  background: #fff;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`

// Card styles
export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: ${CARD_HEIGHT}px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  background: ${({ $empty }) => ($empty ? 'transparent' : '#fff')};
  color: #000;
  ${({ $disabled }) => $disabled && 'opacity: 0.7;'}
  ${({ $hidden, $empty, $disabled }) =>
    !$hidden &&
    !$empty &&
    !$disabled &&
    `
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
    }`}
  ${({ $hidden, $empty }) =>
    $hidden &&
    !$empty &&
    `background: linear-gradient(
        115deg,
        transparent 75%,
        rgba(255, 255, 255, 0.8) 75%
      )
      0 0,
    linear-gradient(245deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%) 0 0,
    linear-gradient(115deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%) 7px -15px,
    linear-gradient(245deg, transparent 75%, rgba(255, 255, 255, 0.8) 75%) 7px -15px,
    ${COLOR_GREEN_LIGHT};
    background-size: 15px 30px;
  `}
`

// Panel styles
export const StyledPanel = styled.div`
  display: flex;
  justify-content: center;
  height: ${CARD_HEIGHT}px;
  margin: 30px 0;
`

export const StyledPanelCard = styled.div`
  margin: 0 20px;
`

// Game board
export const StyledGamePanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 740px;
  margin: 0 auto;
`

export const StyledGameField = styled.div`
  position: relative;
  width: 500px;
  height: 260px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
`

export const StyledGameCentralCard = styled.div`
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(0, -50%);
  z-index: 2;
`

export const StyledGameStackedCards = styled.div`
  position: absolute;
  left: 20px;
  right: 28%;
  top: 50%;
  transform: translate(0, -50%);
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: nowrap;
  height: ${CARD_HEIGHT}px;
  opacity: 0.7;
`
export const StyledGameStackedCard = styled.div`
  position: relative;
  flex: 0 1 8.3%;
  overflow: hidden;

  &:first-child {
    flex: 0 1 22%;
  }

  & > ${StyledCard} {
    position: absolute;
    left: 0;
    top: 0;
  }
`
