import { StoreContext } from 'storeon/react'
import { store } from '../store'
import Board from './Board'

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Board />
    </StoreContext.Provider>
  )
}

export default App
