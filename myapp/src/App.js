import React,{useState} from 'react'
import Board from './components/Board'
import ScoreBoard from './components/ScoreBoard'
import ResetButton from './components/ResetButton'
import './App.css'
function App() {
  //sample 
  //const board=["X","X","X","X","X","X","X","X","X"]
  const [board,setBoard]=useState(Array(9).fill(null))
  const [xPlaying,setXPlaying]=useState(true)
  const [scores,setScores]=useState({xScore:0,oScore:0})
  const [gameOver,setGameOver]=useState(false)

 const WIN_CONDITIONS=[
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
 ]
   
  const handleBoxClick=(boxId)=>{
    const updateBoard=board.map((value,idx)=>{
      if(idx===boxId){
        return xPlaying===true?"X":"O"
        
      }else{
        return value
      }
    })

    const winner=checkWinner(updateBoard)
    if(winner){
      if(winner==="X"){
        let {xScore}=scores
        xScore+=1
        setScores({...scores,xScore})
       
      }else{
        let {oScore}=scores
        oScore+=1
        setScores({...scores,oScore})
      }
    }

    checkWinner(updateBoard)
    setBoard(updateBoard)
    setXPlaying(!xPlaying)
  }

  const checkWinner=(board)=>{
    for(let i=0; i <WIN_CONDITIONS.length; i++){
      const [x,y,z]=WIN_CONDITIONS[i];

      if(board[x]&& board[x]===board[y] && board[y]===board[z]){
        setGameOver(true)
        return board[x]
      }
    }
  }

  const resetBoard=()=>{
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }
  const clearButton=()=>{
    setScores({
      xScore:0,
      oScore:0
    })
  }

  return (
    <div className="bg-container">
      <ScoreBoard scores={scores} xPlaying={xPlaying}/>
      <Board board={board}  onClick={gameOver? resetBoard:handleBoxClick}/>
      <ResetButton resetBoard={resetBoard} clearButton={clearButton}/>
     
    </div>
   
  )
}

export default App
