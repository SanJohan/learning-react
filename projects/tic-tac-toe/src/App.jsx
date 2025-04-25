
import { useState, useEffect} from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, WINNER_COMBOS} from './constats.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModel.jsx'
import './App.css'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index.js'



function App() {
  console.log('render')

  const [board, setBoard] = useState(()=> {
    //console.log('inicializar el estado del board')
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage)
    } else {
      return Array(9).fill(null)
    }
  })
  
   

  const [turn, setTurn] = useState(() => {
    //console.log('inicializar el estado del turn')
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage()
  }

  
  const updateBoard = (index) => {

      //no actualizamos esta posicion
      //si ya tiene algo
      if(board[index] || winner) return
      //actualizamos el tablero
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      //Cambiar el turno
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
      //guardar partida
      saveGameToStorage({board: newBoard, turn: newTurn})

      const newWinner = checkWinner(newBoard);
      if (newWinner){
        confetti()     
        setWinner(newWinner)
      } else if(checkEndGame(newBoard)){
        setWinner(false)
      }
  }

  useEffect(() => {
    console.log('inciando')
  }, [])

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_,index) => {
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className ="turn">
        <Square isSelected={turn === TURNS.X} updateBoard={updateBoard}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} updateBoard={updateBoard}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
