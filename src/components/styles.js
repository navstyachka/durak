import styled from 'styled-components'

const COLOR_GREEN = '#365136'
const COLOR_GREEN_LIGHT = '#5e8f5e'

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
  z-index: 2;
  height: 100vh;
  margin-bottom: 20px;
  text-align: center;
  background: ${COLOR_GREEN};
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

export const StyledInfo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`

// Game board
export const StyledGamePanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 620px;
  margin: 0 auto;
`

export const StyledGameField = styled.div`
  width: 500px;
  height: 260px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
`

// Card styles
export const StyledCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100px;
  height: 160px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-align: center;
  background: ${({ $empty }) =>
    $empty ? 'transparent' : 'rgba(0, 0, 0, 0.1)'};
  ${({ $hidden, $empty }) =>
    !$hidden &&
    !$empty &&
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
    color: black;
  `}
`

// Panel styles
export const StyledPanel = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`

export const StyledPanelCard = styled.div`
  margin: 0 20px;
`
