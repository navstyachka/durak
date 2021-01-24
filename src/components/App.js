import { StoreContext } from 'storeon/react'
import { store } from '../store'
import Board from './Board'

import '../App.css'

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Board />
    </StoreContext.Provider>
  )
}

export default App
