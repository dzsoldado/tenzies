import './App.css';
import React from 'react';
import Confetti from 'react-dom-confetti';
import Die from './components/Die'

function App() {

  const [state, setState] = React.useState(generateRands())
  const [isWon, setWon] = React.useState(false);
 
  React.useEffect(()=>{
    if((function(){   let iswon = true
      if (!state[0].isHeld) return !iswon;
      for (let i=1; i<state.length; i++){
        if (!state[i].isHeld || state[i].number !== state[0].number) return !iswon
      }
      return iswon;})()){
      setWon(()=>true)
    }
  }, [state])

  function generateRand(){
    return {
      number: Math.floor(Math.random()*6+1), 
      isHeld: false
    }
  }

  function generateRands(){
    let rands = [];
    for (let i=0; i<10; i++){
      rands.push(generateRand())
    }
    return rands
  }

  function roll(){
    if (isWon) {
      setState((current)=>generateRands())
      setWon(()=>false)
    }else{
      setState((current)=>{
        return current.map((die,i)=>{
          return die.isHeld? die : generateRand();
        })
      })
    }
  }

  function toggleHold(indx){
    setState(old=>{
      return old.map((entry, i)=>{
        return i===indx? {...entry, isHeld:!entry.isHeld} : entry
      })
    })
  }

  function dice(){
    return state.map((die, indx)=>(
      <Die 
        key={indx}
        value={die}
        indx={indx}
        toggleHold={toggleHold}
      />
    ))
  }

  return (
    <div className="App">
      <main className='main'>
        <div className="header">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className="dice">
          {dice()}
        </div>
        <button 
        className='roll-btn'
        onClick={()=>roll()}>
          { isWon? 'New Game' : 'Roll' }
        </button>
        <Confetti active={ isWon } />
      </main>
    </div>
  );
}

export default App;
